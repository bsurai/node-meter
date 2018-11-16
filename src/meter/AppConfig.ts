import {writeFileSync} from 'fs';
import {join} from 'path';

const configPath = './../../settings/config-prod.json';
let defaultConfig = require(configPath);

export default class AppConfig {
    static get host() {
        return defaultConfig.host;
    }

    static get utm(): string {
        return defaultConfig.utm;
    }

    static get headers(): [] {
        return defaultConfig.headers;
    }

    static get nginxUsrPsw(): string {
        return defaultConfig.nginxUsrPsw;
    }

    static get requestsPerInterval() {
        return defaultConfig.requestsPerInterval;
    }

    static get rampUpInterval() {
        return defaultConfig.rampUpInterval;
    }

    static get maxWorkers() {
        return defaultConfig.maxWorkers;
    }

    public static setNewValues(values: object) {
        defaultConfig = {
            ...defaultConfig,
            ...values,
        };

        writeFileSync(join(__dirname, configPath), JSON.stringify(defaultConfig));
    }
 }
