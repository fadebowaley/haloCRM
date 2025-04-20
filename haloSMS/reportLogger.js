// reportLogger.js
const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

const reportPath = path.join(__dirname, "sms_report.csv");

async function writeReport(data) {
  const fields = ["number", "name", "status", "attempts", "error"];
  const opts = { fields };

  try {
    const csv = parse(data, opts);
    fs.writeFileSync(reportPath, csv);
    console.log(`📄 Report written to ${reportPath}`);
  } catch (err) {
    console.error("❌ Failed to write report:", err);
  }
}

module.exports = {
  writeReport,
};
