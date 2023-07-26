const redis = require('redis');
const { redisEmitter } = require('../utils/GroupEmitter');

let client;

class ConnectRedis {

    constructor() {
    }

    init() {
        this.setting()
    }

    async setting() {
        try {
            await this._setRedisClient()

        } catch(e) {

        }
    }

    _setRedisClient() {
        client = redis.createClient({
            url: ``
        })
    }

}