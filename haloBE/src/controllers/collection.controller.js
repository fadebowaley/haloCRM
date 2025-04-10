const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { collectionService } = require('../services');

const createCollection = catchAsync(async (req, res) => {
  const collection = await collectionService.createCollection(req.body);
  res.status(httpStatus.CREATED).send(collection);
});

const queryCollections = catchAsync(async (req, res) => {
  const result = await collectionService.queryCollections(req.query);
  res.send(result);
});

const getCollectionById = catchAsync(async (req, res) => {
  const collection = await collectionService.getCollectionById(req.params.collectionId);
  if (!collection) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Collection not found' });
  }
  res.send(collection);
});

const updateCollectionById = catchAsync(async (req, res) => {
  const collection = await collectionService.updateCollectionById(req.params.collectionId, req.body);
  res.send(collection);
});

const deleteCollectionById = catchAsync(async (req, res) => {
  await collectionService.deleteCollectionById(req.params.collectionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCollection,
  queryCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
};
