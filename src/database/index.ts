// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { env, isDevMode } from '#/config';
import { DataSourceService } from '#/services/DataSourceService';

import { entities } from './entities';

export const dataSource = new DataSourceService({
  type: 'mysql',
  entities,
  synchronize: !!isDevMode,
  replication: {
    selector: 'RANDOM',
    canRetry: true,
    master: { url: env.DB_URL },
    slaves: [{ url: env.DB_SLAVE_URL }],
  },
  // logging: ['error'],
  logging: isDevMode ? ['error' /*, 'query'*/] : false,
});
// export async function createDatabase(dbOptions?: MysqlConnectionOptions) {
//   return new DataSourceService({
//     ...dbOptions,
//     type: 'mysql',
//     entities,
//     synchronize: !!isDevMode,
//     replication: {
//       selector: 'RANDOM',
//       canRetry: true,
//       master: { url: env.DB_URL },
//       slaves: [{ url: env.DB_SLAVE_URL }],
//     },
//     // logging: ['error'],
//     logging: isDevMode ? ['error' /*, 'query'*/] : false,
//   });
// }
