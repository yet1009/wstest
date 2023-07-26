const config = require('../utils/JasyptConfig');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const _ = require('lodash');


module.exports = (io) => {

    console.dir(io);

    const pubClient = createClient({ host: 'localhost', port: 26379 });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient))
        io.listen(4005)
    })

}