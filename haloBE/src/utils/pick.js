/**
 * Create an object composed of the picked object properties
 * @param {Object} object - The source object to pick properties from
 * @param {string[]} keys - Array of property keys to pick from the object
 * @returns {Object} A new object containing only the specified properties
 *
 * This utility function creates a new object by picking only specific properties from a source object.
 * It works by:
 * 1. Taking a source object and an array of keys as parameters
 * 2. Using reduce() to iterate through the keys array
 * 3. For each key, checking if it exists in the source object using hasOwnProperty
 * 4. If the key exists, copying that property and its value to a new object
 * 5. Returning the new object with only the picked properties
 *
 * Example usage:
 * pick({a: 1, b: 2, c: 3}, ['a', 'c']) // Returns {a: 1, c: 3}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = pick;
