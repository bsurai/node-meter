import AppConfig from './../meter/AppConfig';

interface IReq {
  body?: string;
}

interface IRes {
  json(p: object): void;
  status(p: number): void;
}

export default class Controller {
  public static set config(newValues: object) {
    AppConfig.setNewValues(newValues);
  }

  public static getConfigs(req: IReq, res: IRes) {
    const {host, utm, headers, nginxUsrPsw, requestsPerInterval, rampUpInterval, maxWorkers} = AppConfig;
    res.json({host, utm, headers, nginxUsrPsw, requestsPerInterval, rampUpInterval, maxWorkers});
  }

  public static updateConfigs(req: IReq, res: IRes) {
    try {
      if (!req.body) {
        throw new Error(`There's no data to update configs.`);
      }
      const newValues = JSON.parse(req.body);
      AppConfig.setNewValues(newValues);
      res.json({ok: true});
    }
    catch (err) {
      res.status(400);
      res.json({name: err.name, message: err.message, stack: err.stack});
    }
  }
}
