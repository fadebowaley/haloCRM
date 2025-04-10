/*
This file handles configuration settings for the application. Let me break it down:

1. Loading Environment Variables:
- Uses dotenv to load settings from a .env file
- Example: If .env has PORT=4000, it becomes accessible as process.env.PORT

2. Validation Schema:
- Uses Joi to validate all environment variables have correct values
- Example schema rules:
  * NODE_ENV must be either 'production', 'development', or 'test'
  * PORT defaults to 3000 if not specified
  * MONGODB_URL is required for database connection
  * JWT settings control how long authentication tokens last

3. Configuration Object:
The exported config object has 4 main sections:

a) Basic settings:
   env: 'development'
   port: 3000

b) MongoDB settings:
   Example:
   mongoose: {
     url: 'mongodb://localhost:27017/myapp',
     options: {...} // Connection options
   }

c) JWT (JSON Web Token) settings:
   Example:
   jwt: {
     secret: 'mySecretKey',
     accessExpirationMinutes: 30,  // Token expires in 30 minutes
     refreshExpirationDays: 30     // Refresh token lasts 30 days
   }

d) Email settings:
   Example:
   email: {
     smtp: {
       host: 'smtp.gmail.com',
       port: 587,
       auth: {
         user: 'myapp@gmail.com',
         pass: 'emailPassword'
       }
     },
     from: 'noreply@myapp.com'
   }

If any required settings are missing or invalid, the app will fail to start with a clear error message.
*/

const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
