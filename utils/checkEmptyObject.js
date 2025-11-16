/**
 * Check if input is an empty object
 * @module utils/checkEmptyObject
 * @param {object} objectInput 
 * @returns {boolean} Returns true if input is both an object and empty, false otherwise
 */
const isEmptyObject = objectInput => {
    return objectInput.constructor === Object && Object.keys(objectInput).length === 0
}

module.exports = isEmptyObject
