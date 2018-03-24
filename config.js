module.exports = require('yargs')
    .usage('Usage: $0 [options]')
    .describe('e', 'elasticsearch url')
    .describe('v', 'possible values: "error", "warn", "info", "debug"')
    .describe('n', 'instance name. used as connected topic and client id prefix')
    .describe('u', 'mqtt broker url. See https://github.com/mqttjs/MQTT.js#connect-using-a-url')
    .describe('m', 'parse mqtt-smarthome payloads')
    .describe('s', 'mqtt topic to subscribe. may be repeated')
    .describe('h', 'show help')
    .describe('k', 'allow tls connections with invalid certificates')
    .alias({
        e: 'elastic-url',
        i: 'index',
        t: 'type',
        h: 'help',
        k: 'insecure',
        n: 'name',
        u: 'url',
        v: 'verbosity',
        c: 'cleanup',
        m: 'mqtt-smarthome',
        s: 'subscribe'
    })
    .demand('subscribe')
    .boolean('mqtt-smarthome')
    .boolean('insecure')
    .default({
        e: 'http://localhost:9200',
        u: 'mqtt://localhost',
        n: 'elasticsearch',
        v: 'info',
        i: 'mqtt',
        t: 'mqtt'
    })
    .version()
    .help('help')
    .argv;
