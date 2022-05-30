import cors from 'cors';
import express, { Express, Router } from 'express';
import useragent from 'express-useragent';
import helmet from 'helmet';
import { Server, createServer } from 'http';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import morgan from 'morgan';
import requestIp from 'request-ip';

import { LoggerService } from '../LoggerService';
import { createErrorMiddleware } from './error.middleware';

export { HttpException } from './exceptions/HttpException';
export { NotImplementedException } from './exceptions/NotImplementedException';
export type { ApiResponseErrorDto, IResposeApi } from './response.dto';

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../../swagger-output.json';

type NodeEnv = 'development' | 'production' | 'testing';
export interface ServerHttpOptions {
  port: number;
  env: NodeEnv;
}

export class ServerHttp {
  public express: Express;
  public readonly server: Server;
  public readonly httpterminator: HttpTerminator;
  private started: boolean;
  private readonly port: number;
  private readonly env: NodeEnv;

  constructor({ port, env }: ServerHttpOptions, private readonly loggerService: LoggerService, private readonly indexRoute: Router) {
    this.started = false;
    this.port = port;
    this.env = env;
    this.express = express();
    this.server = createServer(this.express);
    this.httpterminator = createHttpTerminator({ server: this.server });
    // if (this.socketService) this.socketService.createFromExpress(this.server);
    return this;
  }

  private startMiddlewares() {
    this.express.use(helmet({ crossOriginResourcePolicy: false }));
    this.express.use(cors({ origin: '*' }));
    this.express.use(requestIp.mw());
    this.express.use(useragent.express());
    this.express.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(morgan('dev'));
    return this;
  }

  private startRoutes() {
    // this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.express.use(this.indexRoute);
    this.express.use(createErrorMiddleware(this.loggerService));
    return this;
  }

  // private async startQueues() {
  //   queues.map(queue => queue?.process());
  //   return null;
  // }

  public async close() {
    if (this.server.listening) await this.httpterminator.terminate();
    return null;
    // return Promise.all(queues.map(queue => queue?.destroy()));
  }

  async init() {
    this.startMiddlewares();
    this.startRoutes();
    // await this.startQueues();
    this.started = true;
    return this;
  }

  async listen() {
    try {
      if (!this.started) await this.init();
      return this.express.listen(this.port, () => {
        this.loggerService.logging(`STARTED SERVER NODE_ENV=${this.env}`, `PORT=${this.port}`);
      });
    } catch {
      this.loggerService.logging(`Server ERROR`);
    }
  }
}
