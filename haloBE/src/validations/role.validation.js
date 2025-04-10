const Joi = require('joi');
const { objectId } = require('./custom.validation');



const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().max(200).allow('', null),
    permissions: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getRoles = {
  query: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};



const getRole = {
  params: Joi.object().keys({
    roleId: Joi.string().required().custom(objectId),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string().max(200).allow('', null),
      permissions: Joi.array().items(Joi.string().custom(objectId)),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().required().custom(objectId),
  }),
};




const assignPermissions = {
  params: Joi.object().keys({
    roleId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      permissions: Joi.array().items(Joi.string().required().custom(objectId)).min(1),
    })
    .required(),
};


const bulkCreateRoles = {
  body: Joi.object().keys({
    rolesArray: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string()
            .min(3)
            .max(50)
            .regex(/^[a-zA-Z0-9_ ]+$/)
            .required(), // Example: Enforcing name format
          description: Joi.string().max(200).allow('', null),
        })
      )
      .required(),
  }),
};


module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
  bulkCreateRoles,
  assignPermissions,
};
