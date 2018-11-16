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
  public connect(server: IServer) {
    server.get('/setup', Controller.getConfigs);
    server.post('/setup', Controller.updateConfigs);
  }
}
