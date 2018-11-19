import Api from './Api';
import HttpServer from './Server';

const httpServer = new HttpServer();
const api = new Api();

api.connect(httpServer);
httpServer.run();
