# mqtt2elasticsearch

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![NPM version](https://badge.fury.io/js/mqtt2elasticsearch.svg)](http://badge.fury.io/js/mqtt2elasticsearch)
[![Dependency Status](https://img.shields.io/gemnasium/hobbyquaker/mqtt2elasticsearch.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/mqtt2elasticsearch)
[![Build Status](https://travis-ci.org/hobbyquaker/mqtt2elasticsearch.svg?branch=master)](https://travis-ci.org/hobbyquaker/mqtt2elasticsearch)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Send MQTT messages to Elasticsearch


### Install

`$ sudo npm install -g mqtt2elasticsearch`


### Usage 

```
Usage: mqtt2elasticsearch [options]

Options:
  -e, --elastic-url     elasticsearch url     [default: "http://localhost:9200"]
  -v, --verbosity       possible values: "error", "warn", "info", "debug"
                                                               [default: "info"]
  -n, --name            instance name. used as connected topic and client id
                        prefix                        [default: "elasticsearch"]
  -u, --url             mqtt broker url. May contain user/password
                                                   [default: "mqtt://localhost"]
  -m, --mqtt-smarthome  parse mqtt-smarthome payloads                  [boolean]
  -s, --subscribe       mqtt topic to subscribe. may be repeated      [required]
  -h, --help            Show help                                      [boolean]
  -k, --insecure        allow tls connections with invalid certificates[boolean]
  --version             Show version number                            [boolean]
  -i, --index                                                  [default: "mqtt"]
  -t, --type                                                   [default: "mqtt"]

```  

Example: `$ mqtt2elasticsearch -s '#'`


## License

MIT © [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
