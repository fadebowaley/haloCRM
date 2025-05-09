const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};


const ownerCreate = {
  body: Joi.object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      isOwner: Joi.boolean().valid(false).default(false),
    })
};

const bulkCreate = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        isOwner: Joi.boolean().valid(false).default(false),
      status: Joi.boolean().default(false),
      })
    )
    .required(),
};


const bulkDelete = {
  body: Joi.object().keys({
    tenantId: Joi.string().required(), // Ensure tenantId is required
  }),
};



const getUsers = {
  query: Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    email: Joi.string().email(),
    userId: Joi.string(),
  }),
};


const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      firstname: Joi.string(),
      lastname: Joi.string(),
      isSuper: Joi.boolean().valid(false).default(false),
      isOwner: Joi.boolean().valid(false).default(false),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
     userId: Joi.string().required(),
  }),
};

const restoreUsers = {
  body: Joi.object().keys({
    tenantId: Joi.string().required().trim(),
  }),
};

const restoreUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().trim(),
  }),
};


const softDeleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().trim(),
  }),
};


const assignRoles = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    roles: Joi.alternatives()
      .try(Joi.string().custom(objectId), Joi.array().items(Joi.string().custom(objectId)).min(1))
      .required(),
  }),
};


module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  ownerCreate,
  bulkCreate,
  bulkDelete,
  restoreUser,
  restoreUsers,
  softDeleteUser,
  assignRoles,
};
