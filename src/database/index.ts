import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { env } from '#/config';
import { DataSourceService } from '#/services/DataSourceService';

import { entities } from './entities';

export async function createDatabase(dbOptions?: MysqlConnectionOptions) {
  return new DataSourceService({
    ...dbOptions,
    type: 'mysql',
    entities,
    synchronize: true,
    replication: {
      selector: 'RANDOM',
      canRetry: true,
      master: { url: env.DB_URL },
      slaves: [{ url: env.DB_SLAVE_URL }],
    },
    // logging: ['error'],
    logging: ['error', 'query'],
  }).initialize();
}
