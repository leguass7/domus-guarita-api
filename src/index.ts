import type { Server } from 'http';

import { httpPort, nodeEnv } from './config';
import { dataSource } from './database';
import { createExitHandlerService } from './services/ExitHandlerService';
import { ServerHttp } from './services/ServerHttp';
import { IndexRoute } from './useCases/index.route';
import { loggerService } from './useCases/logger.service';

export async function startApp() {
  const serverHttp = new ServerHttp({ port: httpPort, env: nodeEnv }, loggerService, IndexRoute);
  await dataSource.initialize();

  const exitHandlerService = createExitHandlerService(serverHttp, dataSource);

  const closeServer = async () => {
    return exitHandlerService.handleExit(0, 'TESTING');
  };

  if (dataSource.isInitialized) {
    return {
      serverHttp,
      server: await serverHttp.listen(),
      closeServer,
    };
  }

  return null;
}

if (nodeEnv !== 'testing') startApp();

export type ReturnStartApp = {
  serverHttp: ServerHttp;
  server: Server;
  closeServer: () => Promise<void>;
};
