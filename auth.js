const crypto = require('crypto');

/**
 * Encrypts a password by hashing it with a random salt using PBKDF2.
 * @param {string} password - The plain text password.
 * @returns {string} The formatted salt:hash string.
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored salt:hash string.
 * @param {string} password - The plain text password.
 * @param {string} storedHash - The stored salt:hash string.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === originalHash;
}

module.exports = {
  hashPassword,
  verifyPassword
};
