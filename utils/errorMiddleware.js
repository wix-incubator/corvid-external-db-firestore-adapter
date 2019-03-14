/**
 * A helper that allows passing errors from async/await functions
 * to express 'next' for correct handling.
 * @param {*} fn the function to apply middleware to.
 */
const errorMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = errorMiddleware
