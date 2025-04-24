// triggerSms.js
const { readRecipientsFromCSV } = require("./csvReader");
const { sendBulkSmsWithQueue } = require("./smsService");
const path = require("path");

const typeToSend = (process.argv[2] || "").toLowerCase().trim();
if (!typeToSend) {
  console.error(
    "❌ Please provide a message type (e.g., birthday, reminder, thankyou)"
  );
  process.exit(1);
}

const filePath = path.resolve(__dirname, "recipients.csv");
const senderId = "LTHOUSE";

(async () => {
  try {
    const allRecipients = await readRecipientsFromCSV(filePath);
    const filtered = allRecipients.filter((r) => r.type === typeToSend);

    if (filtered.length === 0) {
      console.log(`⚠️ No '${typeToSend}' messages found in CSV.`);
      return;
    }

    console.log(`📂 Parsed recipients:`, filtered);
    console.log(`📨 Sending ${filtered.length} '${typeToSend}' messages...`);

    const result = await sendBulkSmsWithQueue(senderId, filtered);

    console.log("✅ Done:", result.length);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
  }
})();
