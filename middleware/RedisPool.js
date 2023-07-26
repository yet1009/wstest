const config = require('../utils/JasyptConfig');
const redis = require('redis');
const _ = require('lodash');

module.exports = (app) => {

    console.dir(app);

    const clientMaster = redis.createClient({
        host: 'localhost',
        port: 26379
    })

    clientMaster.on('connect', () => {
        console.log('Redis Connect');
    })

    clientMaster.on('error', (err) => {
        console.error('Redis Master error : ', err)
    })

}