import twilio from 'twilio';
import config from '../config/config.js'

const twilioClient = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);


export const sendSMS = async options => {
    let result = await twilioClient.messages.create(options);
    return result;
}