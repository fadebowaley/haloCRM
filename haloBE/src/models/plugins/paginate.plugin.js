/* eslint-disable no-param-reassign */

/**
 * This is a Mongoose plugin that adds pagination functionality to your database queries.
 *
 * What it does:
 * - Lets you fetch data in smaller chunks (pages) instead of all at once
 * - Allows sorting data in different ways
 * - Can populate related data from other collections
 *
 * Example usage:
 *
 * // Get the first page of users, 10 per page, sorted by email
 * const result = await User.paginate({}, { page: 1, limit: 10, sortBy: 'email:asc' });
 *
 * // Result will look like:
 * {
 *   results: [
 *     { id: '1', name: 'Alice', email: 'alice@example.com' },
 *     { id: '2', name: 'Bob', email: 'bob@example.com' },
 *     // ... up to 10 users
 *   ],
 *   page: 1,
 *   limit: 10,
 *   totalPages: 5,    // If there are 50 users total
 *   totalResults: 50
 * }
 *
 * // Get page 2 of active users, populate their 'posts'
 * const result = await User.paginate(
 *   { isActive: true },
 *   {
 *     page: 2,
 *     limit: 10,
 *     populate: 'posts',
 *     sortBy: 'createdAt:desc'
 *   }
 * );
 */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
