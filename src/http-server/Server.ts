import restify from 'restify';
import {RequestHandler} from 'restify';

export default class HttpServer {
  private server: restify.Server;

  constructor() {
    this.server = restify.createServer({
      name: 'node-meter',
      version: '1.0.0'
    });
  }

  public get(path: string, cb: RequestHandler) {
    console.log('server get /setup');
    this.server.get(path, cb);
  }

  public post(path: string, cb: RequestHandler) {
    console.log('server post /setup');
    this.server.post(path, cb);
  }

  public run() {
    this.server.listen(8080, () => {
      console.log('%s listening at %s', this.server.name, this.server.url);
    });
  }
}
