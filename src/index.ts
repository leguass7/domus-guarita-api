import { httpPort, nodeEnv } from './config';
import { createDatabase } from './database';
import { createExitHandlerService } from './services/ExitHandlerService';
import { ServerHttp } from './services/ServerHttp';
import { IndexRoute } from './useCases/index.route';
import { loggerService } from './useCases/logger.service';

export async function startApp() {
  const serverHttp = new ServerHttp({ port: httpPort, env: nodeEnv }, loggerService, IndexRoute);
  const dataSource = await createDatabase();

  const exitHandlerService = createExitHandlerService(serverHttp, dataSource);

  const closeServer = async () => {
    exitHandlerService.handleExit(0, 'TEST');
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
