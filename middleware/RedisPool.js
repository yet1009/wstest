const config = require('../utils/JasyptConfig');
const redis = require('redis');
const _ = require('lodash');

module.exports = (app) => {

    const clientMaster = redis.createClient({
        host: 'localhost',
        port: 26379
    })

    clientMaster.on('error', (err) => {
        console.error('Redis Master error : ', err)
    })


}