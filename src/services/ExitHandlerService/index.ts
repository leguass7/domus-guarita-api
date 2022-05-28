/* eslint-disable no-console */
import { DataSourceService } from '../DataSourceService';
import type { ServerHttp } from '../ServerHttp';

export function createExitHandlerService(server: ServerHttp, dataSource: DataSourceService) {
  const handleExit = async (code: number, sig = 'UNKNOW', timeout = 500): Promise<void> => {
    try {
      console.log(`(${sig}) Attempting a graceful shutdown with code ${code}`);

      setTimeout(() => {
        console.log(`Forcing a shutdown with code ${code}`);
        process.exit(code);
      }, timeout).unref();

      await server.close();

      if (dataSource) await dataSource.close();

      console.log(`Exiting gracefully with code ${code}`);
      process.exit(code);
    } catch (error) {
      console.log('Error shutting down gracefully');
      console.log(error);
      console.log(`Forcing exit with code ${code}`);
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
