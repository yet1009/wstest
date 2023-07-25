

const app = require('../index');
const config = require('../utils/JasyptConfig');
const log = require('electron-log');

const http = require('http');


const port = '4005';
app.set('port', port)
log.log(config)

const server = http.createServer(app);

server.listen(port, () => {

})





