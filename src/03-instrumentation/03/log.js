const pkg = require('../../../package.json');
const bunyan = require('bunyan');
const bunyantcp = require('bunyan-logstash-tcp');

const log = bunyan.createLogger({
    name: pkg.name,
    
    streams: [
        {
            stream: process.stout
        },
        {
            type: 'raw',
            stream: bunyantcp.createStream({
                host: '127.0.0.1',
                port: 5000
            })
        }
    ]
});
module.exports = log;