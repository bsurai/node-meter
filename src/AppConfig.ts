const defaultConfig = require('./../settings/config-prod.json');

export default class AppConfig {
    static get host() {
        return defaultConfig.host;
    }

    static get utm(): string {
        return defaultConfig.utm;
    }

    static get headers():[] {
        return defaultConfig.headers;
    }

    static get nginxUsrPsw(): string {
        return defaultConfig.nginxUsrPsw;
    }
}
