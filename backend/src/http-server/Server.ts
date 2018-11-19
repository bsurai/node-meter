import restify from 'restify';
import {RequestHandler} from 'restify';

export default class HttpServer {
  private server: restify.Server;

  constructor() {
    this.server = restify.createServer({
      name: 'node-meter',
      version: '1.0.0'
    });

    this.server.use(function crossOrigin(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      return next();
    });
    this.server.use(restify.plugins.bodyParser());
  }

  public get(path: string, cb: RequestHandler) {
    this.server.get(path, cb);
  }

  public post(path: string, cb: RequestHandler) {
    this.server.post(path, cb);
  }

  public run() {
    this.server.listen(8080, () => {
      console.log('%s listening at %s', this.server.name, this.server.url);
    });
  }
}
