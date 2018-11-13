const defaultConfig = require('./../settings/config-prod.json');

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
}
