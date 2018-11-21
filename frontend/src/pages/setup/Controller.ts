import 'isomorphic-fetch';
import {ILogResponses} from '../../../../backend/src/meter/AppConfig';
const hash = require('object-hash');

interface IComponent {
  setState(func: () => IState): void;
}
export interface IDataDTO {
  host?: string;
  maxWorkers?: number;
  rampUpInterval?: number;
  requestsPerInterval?: number;
  utm?: string;
  headers?: {[k: string]: string };
  running?: boolean;
  logResponses: ILogResponses;
}

export interface IData {
  host?: string;
  workers?: number;
  rampUp?: number;
  requests?: number;
  utm?: string;
  userAgent?: string;
  log200: boolean;
  log300: boolean;
  log400: boolean;
  log500: boolean;
  logError: boolean;
}

export interface IState {
  data: IData,
  error: Error,
  loading: boolean,
  modified: boolean,
  running: boolean,
}

class Controller {
  private static loading: boolean = true;
  private static modified: boolean = false;
  private static running: boolean = false;
  private static data: IData  = null;
  private static dataHash: string;

  public static state(): IState {
    return {
      data: this.data,
      error: null,
      loading: this.loading,
      modified: this.modified,
      running: this.running,
    };
  }

  private static setState(component: IComponent, error: Error = null) {
    component.setState(() => ({
      error,
      data: this.data,
      loading: this.loading,
      modified: this.modified,
      running: this.running,
    }));
  }

  public static async fetch(component: IComponent): Promise<void> {
    try {
      await delay(1000);
      const resp = await fetch('http://localhost:8080/setup', {method: 'GET'});
      
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      
      const data: IDataDTO = await resp.json();
      
      this.data = {
        host: data.host,
        rampUp: data.rampUpInterval,
        requests: data.requestsPerInterval,
        userAgent: data.headers['User-Agent'],
        utm: data.utm,
        workers: data.maxWorkers,
        log200: data.logResponses[200],
        log300: data.logResponses[300],
        log400: data.logResponses[400],
        log500: data.logResponses[500],
        logError: data.logResponses.error,
      };
      this.dataHash = hash(this.data || {});
      this.running = data.running;

      this.loading = false;
      this.modified = false;

      this.setState(component);
    }
    catch (err) {
      this.setState(component, err);
    }
  }

  public static async applyData(component: IComponent) {
    try {
      this.loading = true;
      this.setState(component);

      const body: IDataDTO = {
        headers: {'User-Agent': this.data.userAgent},
        host: this.data.host,
        maxWorkers: this.data.workers,
        rampUpInterval: this.data.rampUp,
        requestsPerInterval: this.data.requests,
        utm: this.data.utm,
        logResponses: {
          '200': this.data.log200,
          '300': this.data.log300,
          '400': this.data.log400,
          '500': this.data.log500,
          error: this.data.logError,
        },
      };
      const json = JSON.stringify(body);
      const resp = await fetch('http://localhost:8080/setup', {method: 'POST', body: json});
      
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(`${resp.status} ${resp.statusText} ${err.name} ${err.message} ${err.stack}`);
      }
      
      this.dataHash = hash(this.data || {});

      this.loading = false;
      this.modified = false;

      this.setState(component);
    }
    catch (err) {
      this.loading = false;
      this.setState(component, err);
    }
  }

  public static async startMeter(component: IComponent) {
    try {
      this.loading = true;
      this.setState(component);

      const resp = await fetch('http://localhost:8080/setup/start', {method: 'POST'});
      
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(`${resp.status} ${resp.statusText} ${err.name} ${err.message} ${err.stack}`);
      }
      
      this.running = true;
      this.loading = false;
      this.setState(component);
    }
    catch (err) {
      this.loading = false;
      this.setState(component, err);
    }
  }

  public static async stopMeter(component: IComponent) {
    try {
      this.loading = true;
      this.setState(component);

      const resp = await fetch('http://localhost:8080/setup/stop', {method: 'POST'});
      
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(`${resp.status} ${resp.statusText} ${err.name} ${err.message} ${err.stack}`);
      }
      
      this.running = false;
      this.loading = false;
      this.setState(component);
    }
    catch (err) {
      this.loading = false;
      this.setState(component, err);
    }
  }

  public static handleChangeInput(component: IComponent, key: keyof IData, value: string | number): void {
    this.data = {
      ...this.data,
      [key]: typeof this.data[key] === 'number' ? Number(value) : String(value),
    }

    const newHash = hash(this.data);
    this.modified = newHash !== this.dataHash;
    this.setState(component);
  }

  public static handleChangeCheckbox(component: IComponent, key: keyof IData, value: boolean): void {
    this.data = {
      ...this.data,
      [key]: !!value,
    }

    const newHash = hash(this.data);
    this.modified = newHash !== this.dataHash;
    this.setState(component);
  }
}

async function delay(ms: number) {
  return new Promise(res => setInterval(res, ms));
}

export default Controller;
