// csvReader.js
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function readRecipientsFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    const recipients = [];
    fs.createReadStream(path.resolve(filePath))
      .pipe(csv())
      .on("data", (row) => {
        recipients.push({
          name: row.name?.trim(),
          // support both "phoneNumber" and "phonenumber"
          phonenumber: (row.phoneNumber || row.phonenumber || "").trim(),
          content: row.content?.trim(),
          type: (row.type || "general").toLowerCase().trim(),
        });
      })
      .on("end", () => {
        console.log("📂 Parsed recipients:", recipients);
        resolve(recipients);
      })
      .on("error", reject);
  });
}

module.exports = {
  readRecipientsFromCSV,
};
