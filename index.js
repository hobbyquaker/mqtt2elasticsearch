#!/usr/bin/env node

const Mqtt = require('mqtt');
const request =	require('request');
const log = require('yalm');
const pkg = require('./package.json');
const config = require('./config.js');

process.title = pkg.name;
log.setLevel(config.verbosity);
log.info(pkg.name + ' ' + pkg.version + ' starting');

let mqttConnected;
let url;
let currentDate;

createMapping();

log.debug('mqtt trying to connect', config.url);

const mqtt = Mqtt.connect(config.url, {
    will: {topic: config.name + '/connected', payload: '0', retain: true},
    clientId: config.name + '_' + Math.random().toString(16).substr(2, 8),
    rejectUnauthorized: !config.insecure
});

mqtt.on('connect', () => {
    mqttConnected = true;

    log.info('mqtt connected', config.url);
    mqtt.publish(config.name + '/connected', '2', {retain: true});

    if (typeof config.subscribe === 'string') {
        config.subscribe = [config.subscribe];
    }
    config.subscribe.forEach(topic => {
        log.info('mqtt subscribe', topic);
        mqtt.subscribe(topic);
    });
});

mqtt.on('close', () => {
    if (mqttConnected) {
        mqttConnected = false;
        log.info('mqtt closed ' + config.url);
    }
});

mqtt.on('error', err => {
    log.error('mqtt', err.message);
});

mqtt.on('message', (topic, payload, msg) => {
    if (msg.retain) {
        return;
    }

    payload = payload.toString();
    log.debug('mqtt <', topic, payload);

    const data = {
        '@timestamp': (new Date()).getTime(),
        topic,
        payload
    };

    if (config.mqttSmarthome) {
        try {
            const json = JSON.parse(payload);
            if (json && typeof json.val !== 'undefined') {
                data['val_' + (typeof json.val).toLowerCase()] = json.val;
                data.ts = json.ts;
                data.lc = json.lc;
            }
        } catch (err) {}
    }
    const body = JSON.stringify(data);

    const d = new Date();
    const date = d.getDate();
    if (date !== currentDate) {
        const index = config.index + '-' + d.getFullYear() + '.' + ('0' + (d.getMonth() + 1)).substr(-2) + '.' + ('0' + date).substr(-2);
        url = config.elasticUrl + '/' + index + '/' + config.type + '/';
        currentDate = date;
    }

    log.debug('post', url, body);
    request.post({
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        body,
        strictSSL: !config.insecure
    }, (err, res) => {
        if (err) {
            log.error(err);
        } else if (res.statusCode !== 200 && res.statusCode !== 201) {
            log.error(res.statusCode, res.body);
        }
    });
});

function createMapping() {
    const data = {
        index_patterns: [config.index + '-*'], // eslint-disable-line camelcase
        mappings: {}
    };
    data.mappings[config.type] = {
        properties: {
            '@timestamp': {type: 'date'}
        }
    };
    if (config.mqttSmarthome) {
        data.mappings[config.type].properties.ts = {type: 'date'};
        data.mappings[config.type].properties.lc = {type: 'date'};
        data.mappings[config.type].properties.val_number = {type: 'float'}; // eslint-disable-line camelcase
    }
    log.debug('create mappings', JSON.stringify(data));
    request.put({
        url: config.elasticUrl + '/_template/' + config.index,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        strictSSL: !config.insecure
    }, err => {
        if (err) {
            log.error(err.message);
        }
    });
}

