const config = require('config');

const decryptedConfig = (function() {
   return config;
})()

module.exports = decryptedConfig;