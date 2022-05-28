import { DataSource, DataSourceOptions } from 'typeorm';

import { LogClass } from '../LoggerService/log-class.decorator';

@LogClass
export class DataSourceService extends DataSource {
  constructor(dbOptions: DataSourceOptions) {
    super(dbOptions);
  }

  async close() {
    return this.destroy();
  }
}
