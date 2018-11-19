import Controller from './Controller';

interface IReq {
  body?: string;
}

interface IRes {
  json(p: object): void;
  status(p: number): void;
}

interface IServer {
  get(path: string, cb: (req: IReq, res: IRes) => void): void;
  post(path: string,  cb: (req: IReq, res: IRes) => void): void;
}

export default class Api {
  private controller: Controller = null;

  constructor() {
    this. controller = new Controller();
  }
  public connect(server: IServer) {
    server.post('/setup/start', (req, res) => this.controller.start(req, res));
    server.post('/setup/stop', (req, res) => this.controller.stop(req, res));
    server.get('/setup', (req, res) => this.controller.getConfigs(req, res));
    server.post('/setup', (req, res) => this.controller.updateConfigsAndRestart(req, res));
  }
}
