import request from 'request';
import delay from '../utils/delay';

export interface IRequestParams {
  path: string;
  proxy: string;
}

export interface IConfig {
  host: string;
  headers: [];
  utm: string;
  nginxUsrPsw: string;
}

const errors = [Error];

export default class Agent {
  private config: IConfig;
  private sentReqests: number = 0;
  private goodResponses: number = 0;
  private badResponses: number = 0;

  constructor(config: IConfig) {
    this.config = config;
  }

  public async run(params: IRequestParams[], nestedURLs: string[], duration = 0) {
    console.log(`${new Date()} - started`);

    try {
      const mainTime = 0.9;
      const taleTime = 1 - mainTime;
      const interval = params.length ? Math.floor(mainTime * duration / params.length) : 0;
      console.log('interval = ', interval);

      for (const item of params) {
        await delay(interval);
        this.requestProductPage(item, nestedURLs);
      }
      await delay(taleTime * duration);
      console.log(`${new Date()} - finished. sent=${this.sentReqests} good=${this.goodResponses} bad=${this.badResponses}`);
      // console.log(`sent=${this.sentReqests} good=${this.goodResponses} bad=${this.badResponses}`);
    }
    catch (err) {
      console.log('!!! ERR !!!');
      console.log(err);
    }
  }

  private async requestProductPage(item: IRequestParams, nestedURLs: string[]) {
    try {
      this.sentReqests++;
      // console.log('----- sent ------ ', item.proxy, item.productName, new Date());
      const {host, headers, utm, nginxUsrPsw} = this.config;
      const url = `https://${nginxUsrPsw}${host}/${item.path}${utm}`;
      const options = {
        url,
        proxy: `http://${item.proxy}`,
        headers,
        strictSSL: false
      };

      // console.log(options);
      request.get(options, (error, response, body) => {
        // console.log('statusCode 1:', response && response.statusCode, ' at ', new Date());
        // console.log('................');
        //  console.log('error:', error); // Print the error if one occurred
        //  console.log('statusCode:', response && response.statusCode);
        // Print the response status code if a response was received
        //  console.log('body:', body);

        if (!!response && !error && response.statusCode >= 200) {
          this.badResponses++;
          console.log(response.statusCode, ' ', response.statusMessage, ' ', item.proxy, ' ', url);
          return;
        }
        else if (error) {
          this.badResponses++;
          console.log(error.message );
          return;
        }
        else if (!!response && response.statusCode === 200) {
          this.goodResponses++;
          return;
        }
        else {
          console.log('Error with the response: Something else');
          return;
        }
          /* errors.push(error);
          console.log('................');
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode);
          // Print the response status code if a response was received
          console.log('body:', !!body); */

        if (true) {
           return;
        }

        for (const nested of nestedURLs) {
          const opt2 = {
            url: `${nested}${utm}`,
            proxy: `http://${item.proxy}`,
            headers,
            strictSSL: false
          };
          request(opt2, (errorNested, responseNested, bodyNested) => {
            // console.log('statusCode 2:', response && response.statusCode, ' at ', new Date());
            if (errorNested) {
              errorNested.push(errorNested);
              // console.log('.  .  .  .  .  .  .');
              // console.log('error:', error); // Print the error if one occurred
              // console.log('statusCode:', response && response.statusCode);
              // Print the response status code if a response was received
              // console.log('body:', !!body);
            }
          });
        }
      });
    }
    catch (err) {
      console.log('!!! ERR  requestProductPage !!!');
      console.log(err);
    }
  }
}
