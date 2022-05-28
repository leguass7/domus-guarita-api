import type { DeepPartial, FindOptionsWhere } from 'typeorm';

import type { DataSourceService } from '#/services/DataSourceService';
import { LogClass } from '#/services/LoggerService/log-class.decorator';

import { User } from './user.entity';

@LogClass
export class UserService {
  constructor(private dataSource: DataSourceService) {}

  async findOne(filter: FindOptionsWhere<User>) {
    const repository = this.dataSource.getRepository(User);
    const user = await repository.findOne({ where: { ...filter } });
    return user;
  }

  async create(data: DeepPartial<User>) {
    const repository = this.dataSource.getRepository(User);
    const user = repository.create(data);
    const result = repository.save(user);
    return result;
  }

  async updateLastLogged(userId: number): Promise<void> {
    const repository = this.dataSource.getRepository(User);
    await repository.update(userId, { lastLogin: new Date() });
  }
}
