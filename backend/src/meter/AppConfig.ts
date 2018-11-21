import {writeFileSync} from 'fs';
import {join} from 'path';

const configPath = '../../settings/config-prod.json';
let defaultConfig: IMeterConfigs = require(configPath);

export interface ILogResponses {
    '200': boolean;
    '300': boolean;
    '400': boolean;
    '500': boolean;
    error: boolean;
}

export interface IMeterConfigs {
    host: string;
    utm: string;
    headers: [];
    nginxUsrPsw: string;
    requestsPerInterval: number;
    rampUpInterval: number;
    maxWorkers: number;
    logResponses: ILogResponses;
}

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

    static get logResponses() {
        return {
            ...defaultConfig.logResponses
        };
    }

    public static setNewValues(values: IMeterConfigs) {
        defaultConfig = {
            ...defaultConfig,
            ...values,
            logResponses: {...values.logResponses},
        };

        writeFileSync(join(__dirname, configPath), JSON.stringify(defaultConfig));
    }
 }
