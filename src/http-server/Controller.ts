import AppConfig from './../meter/AppConfig';

export default class Controller {
  public static get config() {
    const {host, utm, headers, nginxUsrPsw, requestsPerInterval, rampUpInterval, maxWorkers} = AppConfig;
    return {host, utm, headers, nginxUsrPsw, requestsPerInterval, rampUpInterval, maxWorkers};
  }
}
