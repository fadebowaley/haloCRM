const mongoose = require('mongoose');
const { toJSON, paginate, tenantPlugin } = require('./plugins');
const Level = require('./level.model');

const nodeSchema = mongoose.Schema(
  {
    tenantId: {
      type: String,
      index: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nodes',
      default: null,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String },
    dateOfEstablishment: { type: Date },
    isMain: { type: Boolean, default: true },
    isOwner: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Hybrid hierarchy fields
    identity: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nodes' }],
    hierarchy: { type: mongoose.Schema.Types.Mixed }, // { hq: ObjectId, region: ObjectId, ... }
    path: { type: String }, // "id0/id1/id2/id3"

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

nodeSchema.plugin(toJSON);
nodeSchema.plugin(paginate);
nodeSchema.plugin(tenantPlugin);


nodeSchema.index({ tenantId: 1, users: 1 });
nodeSchema.index({ path: 1 });
nodeSchema.index({ deletedAt: 1 });

/**
 * @typedef Node
 */

// CREATE: Create a new node
nodeSchema.statics.createNode = async function (data) {
  const node = await this.create(data);
  return node;
};

// READ: Get a node by ID (with tenant isolation and user population)
nodeSchema.statics.getNodeById = async function (nodeId, tenantId) {
  const node = await this.findOne({ _id: nodeId, tenantId, deletedAt: null }).populate('users');
  if (!node) throw new Error('Node not found');
  return node;
};

// UPDATE: Update node fields
nodeSchema.statics.updateNodeById = async function (nodeId, tenantId, updateData) {
  const allowedFields = [
    'level', 'parent', 'name', 'address', 'city', 'state', 'country',
    'postalCode', 'dateOfEstablishment', 'isMain', 'isOwner', 'users',
    'identity', 'hierarchy', 'path',
  ];

  const node = await this.findOne({ _id: nodeId, tenantId, deletedAt: null });
  if (!node) throw new Error('Node not found or already deleted');

  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      node[field] = updateData[field];
    }
  });

  await node.save();
  return node;
};

// DELETE: Soft delete a node
nodeSchema.statics.deleteNodeById = async function (nodeId, tenantId) {
  const node = await this.findOne({ _id: nodeId, tenantId, deletedAt: null });
  if (!node) throw new Error('Node not found or already deleted');

  node.deletedAt = new Date();
  await node.save();
  return node;
};





// Utility function to build hierarchy dynamically based on level names
async function buildHierarchy(node) {
  const identity = [];
  const hierarchy = {};
  const pathParts = [];

  let current = node.parent;

  while (current) {
    const parentNode = await node.constructor.findById(current).populate('level');
    if (!parentNode) throw new Error('Invalid parent reference.');

    identity.unshift(parentNode._id);
    if (parentNode.level?.name) {
      hierarchy[parentNode.level.name.toLowerCase()] = parentNode._id;
    }

    pathParts.unshift(parentNode._id.toString());
    current = parentNode.parent;
  }

  pathParts.push(node._id.toString());

  node.identity = identity;
  node.hierarchy = hierarchy;
  node.path = pathParts.join('/');
}

// Pre-save hook for hierarchy construction
nodeSchema.pre('save', async function (next) {
  try {
    await buildHierarchy(this);
    next();
  } catch (err) {
    next(err);
  }
});

// Static method to update parent and re-calculate hierarchy
nodeSchema.statics.updateNodeParent = async function (nodeId, newParentId) {
  const node = await this.findById(nodeId);
  const newParent = newParentId ? await this.findById(newParentId).populate('level') : null;

  if (!node) throw new Error('Node not found');
  if (newParentId && !newParent) throw new Error('New parent not found');

  node.parent = newParentId || null;
  await buildHierarchy(node);
  await node.save();

  // Update descendants
  const descendants = await this.find({ path: new RegExp(`^${node._id}`) });
  for (const descendant of descendants) {
    await buildHierarchy(descendant);
    await descendant.save();
  }

  return node;
};

// Static method to get a node by its path
nodeSchema.statics.getNodeByPath = async function (path) {
  return this.findOne({ path });
};

nodeSchema.statics.getNodeWithChildren = async function (nodeId) {
  // Find the node with the given ID
  const node = await this.findById(nodeId);
  if (!node) throw new Error('Node not found');

  // Find all child nodes by checking the 'path' field
  return this.find({ path: { $regex: `^${node.path}` } });
};

nodeSchema.statics.getNodeWithParents = async function (nodeId) {
  const node = await this.findById(nodeId);
  if (!node) throw new Error('Node not found');

  const parents = [];
  let current = node.parent;

  while (current) {
    const parentNode = await this.findById(current).populate('level');
    if (!parentNode) break;
    parents.unshift(parentNode); // Insert at the beginning of the array to maintain order
    current = parentNode.parent;
  }

  return [...parents, node]; // Include the node itself as the last "parent"
};

nodeSchema.statics.getAllNodesOrderedByLevel = async function () {
  return this.find().sort({ level: 1, path: 1 }); // Sort by levels first, then path for order within level
};


const Nodes = mongoose.model('Nodes', nodeSchema);
module.exports = Nodes;
