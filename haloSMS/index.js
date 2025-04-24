const path = require("path");
const { scheduleTypeSpecificSms } = require("./cronTasks");

const filePath = path.resolve(__dirname, "recipients.csv");
const senderId = "LTHOUSE";

// Run 'thankyou' messages every day at 8:05am (batch 1 only)
//scheduleTypeSpecificSms(filePath, senderId, "thankyou", "5 8 * * *", 1);

// Run all 'birthday' messages every day at 7:00am
//scheduleTypeSpecificSms(filePath, senderId, "birthday", "0 7 * * *");

// Run birthday batch 2 only if time is between 00:35 and 01:00
scheduleTypeSpecificSms(
  filePath,
  senderId,
  "thankyou",
  "* * * * *", // every minute
  2,
  { start: "05:00", end: "07:00" } // only run within this range
);
