const defaultConfig = require('./../settings/config-prod.json');

class AppConfig {
    static get host() {
        return defaultConfig.host;
    }

    static get utm() {
        return defaultConfig.utm;
    }

    static get headers() {
        return defaultConfig.headers;
    }

    static get nginxUsrPsw() {
        return defaultConfig.nginxUsrPsw;
    }
}

module.exports = AppConfig;
