const cron = require("node-cron");
const path = require("path");
const { readRecipientsFromCSV } = require("./csvReader");
const { sendBulkSmsWithQueue } = require("./smsService");
const { writeReport } = require("./reportLogger");

const smsTemplate = "Hi {{name}}, {{content}}";
const BATCH_SIZE = 10;

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// 👇 Track last run dates per message type
const lastRunByType = {};

function scheduleTypeSpecificSms(
  filePath,
  senderId,
  type,
  cronTime,
  batchNumber = null,
  timeWindow = null // e.g., { start: "06:00", end: "07:00" }
) {
  cron.schedule(cronTime, async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const today = now.toISOString().split("T")[0]; // e.g., "2025-04-19"

    // Check time window
    if (timeWindow) {
      const [startHour, startMin] = timeWindow.start.split(":").map(Number);
      const [endHour, endMin] = timeWindow.end.split(":").map(Number);

      const nowInMinutes = currentHour * 60 + currentMinute;
      const startInMinutes = startHour * 60 + startMin;
      const endInMinutes = endHour * 60 + endMin;

      if (nowInMinutes < startInMinutes || nowInMinutes >= endInMinutes) {
        console.log(
          `⏱️ Skipping '${type}' - outside allowed time window (${timeWindow.start}–${timeWindow.end})`
        );
        return;
      }

      // Prevent running more than once a day within the time window
      if (lastRunByType[type] === today) {
        console.log(`🔁 Skipping '${type}' - already ran today.`);
        return;
      }

      lastRunByType[type] = today;
    }

    console.log(`🕘 Cron triggered for '${type}' messages...`);

    try {
      const allRecipients = await readRecipientsFromCSV(filePath);
      const filtered = allRecipients.filter((r) => r.type === type);

      if (filtered.length === 0) {
        console.log(`⚠️ No '${type}' messages found in CSV.`);
        return;
      }

      const chunks = chunkArray(filtered, BATCH_SIZE);
      const batchesToSend = batchNumber ? [chunks[batchNumber - 1]] : chunks;

      let totalSent = 0;
      let allLogs = [];

      for (let i = 0; i < batchesToSend.length; i++) {
        const batch = batchesToSend[i];
        if (!batch) continue;

        console.log(`📦 Sending batch ${i + 1}/${chunks.length}...`);
        const result = await sendBulkSmsWithQueue(senderId, batch);
        totalSent += result.filter((r) => r.status === "sent").length;
        allLogs.push(...result);

        await new Promise((res) => setTimeout(res, 1000));
      }

      const reportName = `sms-report-${type}-${Date.now()}.csv`;
      await writeReport(allLogs, reportName);
      console.log(
        `✅ ${totalSent} message(s) sent. Report saved as ${reportName}`
      );
    } catch (err) {
      console.error(`❌ Error during '${type}' cron job:`, err.message || err);
    }
  });
}

module.exports = {
  scheduleTypeSpecificSms,
};
