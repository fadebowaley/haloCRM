const { version } = require('../../package.json');
const config = require('../config/config');

// Steps to update Swagger definition:
// 1. Update the title to reflect your actual API name
// 2. Update the GitHub URL to point to your repository
// 3. Add description and examples if needed

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'HaloCRM API Documentation',
    version,
    description: `
# Introduction
HaloCRM is a comprehensive Customer Relationship Management system that provides a robust API for managing various aspects of your business operations.

## Key Features
- User and Role Management
- Program and Collection Management
- Statement and Payment Tracking
- Report Generation
- Settings Configuration
- Data Management

## Authentication
All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:
\`Authorization: Bearer <your_token>\`

## Rate Limiting
API requests are rate-limited to ensure fair usage. Current limits:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Error Handling
The API uses standard HTTP response codes:
- 2xx: Success
- 4xx: Client errors
- 5xx: Server errors

For detailed error information, check the response body.
    `,
    license: {
      name: 'MIT',
      url: 'https://github.com/fadebowaley/sotsm-portal/blob/main/LICENSE',
    },
    contact: {
      name: 'HaloCRM Support',
      email: 'support@halocrm.com',
      url: 'https://halocrm.com',
    },
    termsOfService: 'https://halocrm.com/terms',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Local Development Server',
    },
    {
      url: 'https://api.halocrm.com/v1',
      description: 'Production Server',
    },
    {
      url: 'https://staging-api.halocrm.com/v1',
      description: 'Staging Server',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and authorization endpoints',
    },
    {
      name: 'Users',
      description: 'User management operations',
    },
    {
      name: 'Roles',
      description: 'Role and permission management',
    },
    {
      name: 'Programs',
      description: 'Program management operations',
    },
    {
      name: 'Collections',
      description: 'Collection management operations',
    },
    {
      name: 'Statements',
      description: 'Statement and payment operations',
    },
    {
      name: 'Reports',
      description: 'Report generation and management',
    },
    {
      name: 'Settings',
      description: 'System settings and configuration',
    },
    {
      name: 'Data',
      description: 'Data management operations',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>',
      },
    },
    responses: {
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 401,
                },
                message: {
                  type: 'string',
                  example: 'Please authenticate',
                },
              },
            },
          },
        },
      },
      NotFoundError: {
        description: 'The specified resource was not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 404,
                },
                message: {
                  type: 'string',
                  example: 'Resource not found',
                },
              },
            },
          },
        },
      },
      ValidationError: {
        description: 'Validation failed',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'integer',
                  example: 400,
                },
                message: {
                  type: 'string',
                  example: 'Validation Error',
                },
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        type: 'string',
                        example: 'email',
                      },
                      message: {
                        type: 'string',
                        example: 'must be a valid email address',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDef;
