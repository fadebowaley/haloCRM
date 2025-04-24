const config = require('../config/config');
const logger = require('../config/logger');
const axios = require('axios');

// Log configuration details for debugging
logger.info(`Sendar URL: ${config.sms.sendar_api_url}`);
logger.info(`Sendar API Key: ${config.sms.sms_api_key}`);

/**
 * Sends SMS to multiple recipients
 * @param {string} senderId
 * @param {Array} messages - Array of message objects: { number, body, sms_type }
 * @param {string} walletType
 * @returns {Promise<object>}
 */
async function sendSms(senderId, messages, walletType = '1') {
  try {
    // Prepare the payload for sending SMS
    const payload = {
      wallet_type: walletType,
      sender_id: senderId,
      contact: messages,
    };

    // Log the payload being sent for debugging
    logger.debug('Sending SMS with payload:', JSON.stringify(payload, null, 2));

    // Make the API request to send SMS
    const response = await axios.post(`${config.sms.sendar_api_url}/sms/send`, payload, {
      headers: {
        'Api-key': config.sms.sms_api_key,
        'Content-Type': 'application/json',
      },
    });

    // Log success message after receiving a response
    logger.info('SMS request sent successfully. Response:', JSON.stringify(response.data, null, 2));

    // Return the response from the API
    return response.data;
  } catch (error) {
    // Log error message if sending SMS fails
    logger.error('SMS sending failed. Error details:', error.response?.data || error.message);
    throw error; // Rethrow error to be handled by caller
  }
}

/**
 * Retrieves SMS status by UID
 * @param {string} uid
 * @returns {Promise<object>}
 */
async function getSmsStatus(uid) {
  try {
    // Log the UID for debugging
    logger.debug(`Fetching SMS status for UID: ${uid}`);

    // Make the API request to get SMS status
    const response = await axios.get(`${config.sms.sendar_api_url}/get/sms/${uid}`, {
      headers: {
        'Api-key': config.sms.sms_api_key,
      },
    });

    // Log the response for debugging
    logger.info('SMS status retrieved successfully. Response:', JSON.stringify(response.data, null, 2));

    // Return the status response
    return response.data;
  } catch (error) {
    // Log error message if fetching SMS status fails
    logger.error('Failed to fetch SMS status. Error details:', error.response?.data || error.message);
    throw error; // Rethrow error to be handled by caller
  }
}

// Test sending reminder SMS
const smsMessage = {
  number: '2348145045108', // replace with actual phone number
  body: 'Your account is not yet verified. Please check your email to complete OTP verification.',
  sms_type: 'plain',
};

// Call sendSms function and log result
(async () => {
  try {
    logger.info('Starting SMS sending process...');
    const response = await sendSms('Halo', [smsMessage]); // Replace 'Halo' with your actual sender ID
    logger.info('SMS sent successfully. Response:', JSON.stringify(response, null, 2));
  } catch (smsError) {
    logger.error('Failed to send OTP reminder SMS:', smsError.response?.data || smsError.message);
  }
})();
