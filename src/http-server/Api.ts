import Controller from './Controller';

interface IReq {
  body?: object;
}

interface IRes {
  json(p: object): void;
}

interface IServer {
  get(path: string, cb: (req: IReq, res: IRes) => void): void;
  post(path: string,  cb: (req: IReq, res: IRes) => void): void;
}

export default class Api {
  public connect(server: IServer) {
    server.get('/setup', (req, res) => {
      console.log('api get /setup');
      res.json(Controller.config);
    });

    server.post('/setup', (req, res) => {
      console.log('api post /setup');
    });
  }
}
