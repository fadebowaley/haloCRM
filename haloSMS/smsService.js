// smsService.js
const { sendSms } = require("./sendSms");
const { writeReport } = require("./reportLogger");

// Config
const BATCH_SIZE = 5; // you can tune this
const DELAY_BETWEEN_BATCHES_MS = 5000;
const RETRY_LIMIT = 3;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function sendBulkSmsWithQueue(senderId, recipients) {
  const results = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    console.log(
      `🚀 Sending batch ${i / BATCH_SIZE + 1} of ${Math.ceil(
        recipients.length / BATCH_SIZE
      )}`
    );

    const batchResults = await Promise.all(
      batch.map(async (recipient) => {
        const personalized = recipient.content.replace(
          /{name}/gi,
          recipient.name || "there"
        );

        let attempts = 0;
        let success = false;
        let error = null;

        while (attempts < RETRY_LIMIT && !success) {
          attempts++;
          try {
            const res = await sendSms(
              senderId,
              recipient.phonenumber,
              personalized
            );
            results.push({
              number: recipient.phonenumber,
              name: recipient.name,
              status: "sent",
              attempts,
              response: res,
            });
            success = true;
          } catch (err) {
            error = err.message || err.toString();
            if (attempts >= RETRY_LIMIT) {
              results.push({
                number: recipient.phonenumber,
                name: recipient.name,
                status: "failed",
                attempts,
                error,
              });
            } else {
              await sleep(1000); // wait before retry
            }
          }
        }
      })
    );

    // Optional: Log after each batch
    console.log(`✅ Batch ${i / BATCH_SIZE + 1} sent.`);

    // Wait before next batch
    if (i + BATCH_SIZE < recipients.length) {
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  // Write report to CSV
  await writeReport(results);
  return results;
}

module.exports = {
  sendBulkSmsWithQueue,
};



