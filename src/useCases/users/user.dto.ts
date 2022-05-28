import { User } from './user.entity';

export interface FindUserDto {
  email?: string;
  id?: number;
}

export interface CreateUserDto extends Omit<User, 'id'> {
  id?: number;
}
