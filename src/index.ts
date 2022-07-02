import type { Server } from 'http';

import { httpPort, nodeEnv } from './config';
import { dataSource } from './database';
import type { DataSourceService } from './services/DataSourceService';
import { createExitHandlerService } from './services/ExitHandlerService';
import { ServerHttp } from './services/ServerHttp';
import { IndexRoute } from './useCases/index.route';
import { loggerService } from './useCases/logger.service';

export async function startApp() {
  const serverHttp = new ServerHttp({ port: httpPort, env: nodeEnv }, loggerService, IndexRoute);
  await dataSource.initialize();
  const { master, slave } = dataSource.getConnectionOptions();

  const exitHandlerService = createExitHandlerService(serverHttp, dataSource);

  const closeServer = async () => {
    return exitHandlerService.handleExit(0, 'TESTING');
  };

  if (dataSource.isInitialized) {
    loggerService.logging('DATABASE CONNECTED:', master?.host, slave?.host);
    return {
      serverHttp,
      server: await serverHttp.listen(),
      closeServer,
      dataSource,
    };
  } else {
    loggerService.logError('DATABASE ERROR: ', master?.host, slave?.database);
  }

  return null;
}

if (nodeEnv !== 'testing') startApp();

export type ReturnStartApp = {
  serverHttp: ServerHttp;
  server: Server;
  closeServer: () => Promise<void>;
  dataSource: DataSourceService;
};
