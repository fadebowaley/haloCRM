const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');

const ACTIONS = ['view', 'create', 'update', 'delete', 'manage', 'assign', 'approve', 'export', 'import'];

const permissionSchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    resource: {
      type: String,
      required: true, // e.g., "users", "orders", "*"
      lowercase: true,
    },

    path: {
      type: String,
      required: true,
      lowercase: true,
    },

    action: {
      type: String,
      required: true,
      enum: ACTIONS,
      lowercase: true,
    },

    method: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: '',
      required : true
    },

    isWildcard: {
      type: Boolean,
      default: false,
    },

    isAdminLevel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

permissionSchema.plugin(toJSON);
permissionSchema.plugin(paginate);
permissionSchema.plugin(tenantPlugin);


// Auto-generate `name` like "view:users"
permissionSchema.pre('validate', function (next) {
  if (!this.name && this.action && this.resource) {
    this.name = `${this.action}:${this.resource}`;
  }
  next();
});

// Normalize `path` to start with a slash
permissionSchema.pre('save', function (next) {
  if (this.path && !this.path.startsWith('/')) {
    this.path = '/' + this.path;
  }
  next();
});

permissionSchema.statics.isPermissionTaken = async function (name, method, path, excludePermissionId) {
  const permission = await this.findOne({
    name,
    method,
    path,
    _id: { $ne: excludePermissionId },
  });
  console.log(name, method, path, 'these are lists of issues')
  return !!permission; // return true if the permission exists, false otherwise
};



permissionSchema.statics.createPermission = async function (permissionBody) {
  const { name, method, path } = permissionBody;

  // Check if permission already exists before attempting to insert
  const isTaken = await this.isPermissionTaken(name, method, path);
  if (isTaken) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Permission with name "${name}", method "${method}", and path "${path}" already exists.`
    );
  }

  const permission = new this(permissionBody);
  await permission.save();
  return permission;
};


// Static: Find by name
permissionSchema.statics.findByName = async function (name) {
  return this.findOne({ name });
};



// Static: Get all permissions for a resource
permissionSchema.statics.findByResource = async function (resource) {
  return this.find({ resource });
};


// Static: Bulk create permissions (e.g., seeding or scaffolding)
permissionSchema.statics.bulkCreatePermissions = async function (permissionsArray, { skipDuplicates = true } = {}) {
  if (skipDuplicates) {
    const existingNames = await this.find({ name: { $in: permissionsArray.map(p => p.name) } }).distinct('name');
    permissionsArray = permissionsArray.filter(p => !existingNames.includes(p.name));
  }
  return this.insertMany(permissionsArray);
};



/**
 * @typedef Permission
 */
const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;
