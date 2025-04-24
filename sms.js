const axios = require("axios");

// // Directly define config values here (placeholders)
// const SENDER_API_URL = 'https://example-sms-api.com'; // Replace with the actual SMS API URL
// const SMS_API_KEY = 'your-api-key-here'; // Replace with the actual API key
const SMS_API_KEY = "ca6c18eb-2fbb-46ef-b956-c1fa199620cd";
const SENDER_API_URL = "https://sendar.io/api";


// Log configuration details for debugging
console.log(`Sendar URL: ${SENDER_API_URL}`);
console.log(`Sendar API Key: ${SMS_API_KEY}`);

/**
 * Sends an SMS to multiple recipients with a custom message
 * @param {string} senderId - The sender ID
 * @param {string} number - Recipient phone number
 * @param {string} body - The message body content
 * @param {string} smsType - Type of the SMS (e.g., plain, promotional, etc.)
 * @param {string} walletType - Type of wallet (default: '2')
 * @returns {Promise<object>} - Response from the SMS API
 */
async function sendSms(
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

    // Log the payload being sent for debugging
    console.log("Sending SMS with payload:", JSON.stringify(payload, null, 2));

    // Make the API request to send SMS
    const response = await axios.post(`${SENDER_API_URL}/sms/send`, payload, {
      headers: {
        "Api-key": SMS_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log(
      "SMS request sent successfully. Response:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error(
      "SMS sending failed. Error details:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error to be handled by caller
  }
}

/**
 * Sends OTP to the provided phone number
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} otp - OTP to send
 * @returns {Promise<object>} - Response from the SMS API
 */
async function sendOtp(phoneNumber, otp) {
  const messageBody = `Your OTP code is: ${otp}. Please use this to complete your verification.`;
  return sendSms("Halo", phoneNumber, messageBody, "plain");
}

/**
 * Sends birthday wishes to the provided phone number
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} name - Name of the recipient
 * @returns {Promise<object>} - Response from the SMS API
 */
async function sendBirthdayWishes(phoneNumber, name) {
  const messageBody = `Happy Birthday, ${name}! Wishing you a day filled with joy and happiness. Enjoy your special day!`;
  return sendSms("Halo", phoneNumber, messageBody, "plain");
}

/**
 * Sends anniversary wishes to the provided phone number
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} name - Name of the recipient or couple
 * @returns {Promise<object>} - Response from the SMS API
 */
async function sendAnniversaryWishes(phoneNumber, name) {
  const messageBody = `Happy Anniversary, ${name}! Wishing you both many more years of love and happiness. Cheers to forever!`;
  return sendSms("Halo", phoneNumber, messageBody, "plain");
}

// Test sending OTP SMS
(async () => {
  try {
    console.log("Starting OTP sending process...");
    const otpResponse = await sendOtp("2348145045108", "123456");
    console.log(
      "OTP sent successfully. Response:",
      JSON.stringify(otpResponse, null, 2)
    );
  } catch (smsError) {
    console.error(
      "Failed to send OTP SMS:",
      smsError.response?.data || smsError.message
    );
  }

  // Test sending Birthday wishes
  try {
    console.log("Starting Birthday wish sending process...");
    const birthdayResponse = await sendBirthdayWishes("2348145045108", "John");
    console.log(
      "Birthday wish sent successfully. Response:",
      JSON.stringify(birthdayResponse, null, 2)
    );
  } catch (smsError) {
    console.error(
      "Failed to send Birthday SMS:",
      smsError.response?.data || smsError.message
    );
  }

  // Test sending Anniversary wishes
  try {
    console.log("Starting Anniversary wish sending process...");
    const anniversaryResponse = await sendAnniversaryWishes(
      "2348145045108",
      "Jane and John"
    );
    console.log(
      "Anniversary wish sent successfully. Response:",
      JSON.stringify(anniversaryResponse, null, 2)
    );
  } catch (smsError) {
    console.error(
      "Failed to send Anniversary SMS:",
      smsError.response?.data || smsError.message
    );
  }
})();
