import request from 'request';
import delay from './utils/delay';

export interface IRequestParams {
  productName: string;
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

  constructor(config: IConfig) {
    this.config = config;
  }

  public async run(params: IRequestParams[], nestedURLs: string[], duration = 0) {
    console.log('started at ', new Date());
    setTimeout(() => {
      // console.log('ended at ', new Date());
      // console.log(errors.length)
    }, 7000);

    try {
      const interval = params.length ? Math.floor(duration / params.length) : 0;
      console.log('interval = ', interval);

      for (const item of params) {
        await delay(interval);
        this.requestProductPage(item, nestedURLs);
      }
    }
    catch (err) {
      console.log('!!! ERR !!!');
      console.log(err);
    }
  }

  private async requestProductPage(item: IRequestParams, nestedURLs: string[]) {
    try {
      console.log('----- sent ------ ', item.proxy, item.productName, new Date());
      const {host, headers, utm, nginxUsrPsw} = this.config;
      const options = {
        url: `https://${nginxUsrPsw}${host}/product/${item.productName}${utm}`,
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

        if (error) {
          /* errors.push(error);
          console.log('................');
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode);
          // Print the response status code if a response was received
          console.log('body:', !!body); */
          return;
        }

        // if (true) {
        //   return;
        // }

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
