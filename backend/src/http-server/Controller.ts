import {fork, ChildProcess} from 'child_process';
import AppConfig from './../meter/AppConfig';
import {join} from 'path';

interface IReq {
  body?: string;
}

interface IRes {
  json(p: object): void;
  status(p: number): void;
}

export default class Controller {
  private meter: ChildProcess = null;

  public set config(newValues: object) {
    AppConfig.setNewValues(newValues);
  }

  public getConfigs(req: IReq, res: IRes) {
    const {host, utm, headers, nginxUsrPsw, requestsPerInterval, rampUpInterval, maxWorkers} = AppConfig;
    res.json({
      running: !!this.meter,
      host,
      utm,
      headers,
      nginxUsrPsw,
      requestsPerInterval,
      rampUpInterval,
      maxWorkers
    });
  }

  public async updateConfigsAndRestart(req: IReq, res: IRes) {
    try {
      if (!req.body) {
        throw new Error(`There's no data to update configs.`);
      }
      const newValues = JSON.parse(req.body);
      AppConfig.setNewValues(newValues);

      if (this.meter) {
        await this.killMeter();
        await this.startMeter();
      }
      res.json({ok: true});
    }
    catch (err) {
      res.status(400);
      res.json({name: err.name, message: err.message, stack: err.stack});
    }
  }

  public async start(req: IReq, res: IRes) {
    try {
      await this.startMeter();
      res.json({ok: true});
    }
    catch (err) {
      res.status(400);
      res.json({name: err.name, message: err.message, stack: err.stack});
    }
  }

  public async stop(req: IReq, res: IRes) {
    try {
      await this.killMeter();
      res.json({ok: true});
    }
    catch (err) {
      res.status(400);
      res.json({name: err.name, message: err.message, stack: err.stack});
    }
  }

  private startMeter(): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      try {
        console.log('22222222');
        if (this.meter) {
          return resolve(this.meter);
        }
        this.meter = fork(join(__dirname, '../meter'));
        this.meter.once('error', (error: Error) => reject(error));
        resolve(this.meter);
      }
      catch (err) {
        reject(err);
      }
    });
  }

  private killMeter() {
    return new Promise((resolve, reject) => {
      try {
        if (!this.meter) {
          return resolve();
        }
        this.meter.kill();
        this.meter = null;
        resolve();
      }
      catch (err) {
        reject(err);
      }
    });
  }
}
