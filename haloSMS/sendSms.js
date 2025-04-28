const axios = require("axios");
require("dotenv").config();

// const SMS_API_KEY = process.env.SMS_API_KEY;
// const SENDER_API_URL = process.env.SENDER_API_URL;
const useMock = process.env.USE_SMS_MOCK === "true";
const SMS_API_KEY = "ca6c18eb-2fbb-46ef-b956-c1fa199620cd";
const SENDER_API_URL = "https://sendar.io/api";

console.log(SENDER_API_URL, SMS_API_KEY);

async function realSendSms(
  senderId,
  number,
  body,
  smsType = "plain",
  walletType = "2"
) {
  try {
    const payload = {
      wallet_type: walletType,
      sender_id: senderId,
      contact: [
        {
          number,
          body,
          sms_type: smsType,
        },
      ],
    };

    console.log("🔧 Sending SMS:", JSON.stringify(payload, null, 2));

    const response = await axios.post(`${SENDER_API_URL}/sms/send`, payload, {
      headers: {
        "Api-key": SMS_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ SMS Error:", error.response?.data || error.message);
    throw error;
  }
}



async function mockSendSms(
  senderId,
  number,
  message,
  smsType = "plain",
  walletType = "1"
) {
  console.log(`🧪 MOCK: Sending SMS to ${number}: "${message}"`);

  const success = Math.random() > 0.1;

  if (!success) {
    throw new Error("Simulated failure");
  }

  return {
    status: "sent",
    number,
    message,
    mock: true,
  };
}


module.exports = {
  sendSms: useMock ? mockSendSms : realSendSms,
};
