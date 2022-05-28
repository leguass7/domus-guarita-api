import { nodeEnv } from '#/config';

import { DataSourceService } from '../DataSourceService';
import type { ServerHttp } from '../ServerHttp';

export function createExitHandlerService(server: ServerHttp, dataSource: DataSourceService) {
  const handleExit = async (code: number, sig = 'UNKNOW', timeout = 500): Promise<void> => {
    const isTesting = ['test', 'testing'].includes(nodeEnv);

    // eslint-disable-next-line no-console
    const log = (str = 'nothing') => !isTesting && console.log(str);
    try {
      if (!isTesting) log(`(${sig}) Attempting a graceful shutdown with code ${code}`);

      setTimeout(() => {
        log(`Forcing a shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      await server.close();

      if (dataSource) await dataSource.close();

      log(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } finally {
      process.exit(code);
    }
  };

  process.on('SIGTERM', () => {
    handleExit(0, 'SIGTERM');
  });

  process.on('SIGINT', () => {
    handleExit(0, 'SIGINT');
  });

  return { handleExit };
}
