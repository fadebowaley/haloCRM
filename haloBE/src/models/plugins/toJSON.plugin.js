/* eslint-disable no-param-reassign */

/**
 * This is a Mongoose plugin that cleans up how your data looks when it's converted to JSON.
 *
 * What it does:
 * 1. Removes technical fields that users don't need to see (__v, createdAt, updatedAt)
 * 2. Changes _id to a more friendly "id"
 * 3. Removes any fields marked as private
 *
 * Example:
 * Original MongoDB document:
 * {
 *   _id: "507f1f77bcf86cd799439011",
 *   __v: 0,
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "hashedPassword123", // marked as private
 *   createdAt: "2023-01-01T00:00:00.000Z",
 *   updatedAt: "2023-01-02T00:00:00.000Z"
 * }
 *
 * After using this plugin:
 * {
 *   id: "507f1f77bcf86cd799439011",
 *   name: "John Doe",
 *   email: "john@example.com"
 * }
 */

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

module.exports = toJSON;
