import { compare } from 'bcryptjs';
import { add } from 'date-fns';

import type { JwtService } from '#/services/JwtService';
import { LogClass } from '#/services/LoggerService/log-class.decorator';
import { HttpException } from '#/services/ServerHttp';
import type { CreateUserDto } from '#useCases/users';
import type { UserService } from '#useCases/users/user.service';

import type { SignInRequestDto } from './auth.dto';
import { generateHashPassword } from './auth.helpers';

interface PayloadLogin {
  userId: number;
  // groupId?: number;
  // parentId?: number;
  // locale?: string;
}

@LogClass
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login({ userId }: PayloadLogin) {
    const days = 1;
    const token = await this.jwtService.generateToken({ userId }, { expiresIn: `${days}d` });
    await this.userService.updateLastLogged(userId);
    return { token, expiration: add(new Date(), { days }) };
  }

  async signIn({ email, password }: SignInRequestDto): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (!user) throw new HttpException(400, 'unregistered_user');
    if (!user?.actived) throw new HttpException(403, 'unavaiable_user');

    const matched = await compare(password, user?.password);
    if (!matched) throw new HttpException(403, 'invalid_credentials');

    const result = await this.login({ userId: user.id });

    // const user = {
    //   id: person.id,
    //   name: person.name,
    //   email: person.email,
    //   avatar: person.avatar,
    // } as Person;

    return { ...result, user };
  }

  async registerUser({ password, ...data }: CreateUserDto) {
    const pass = await generateHashPassword(password);
    const newUser = this.userService.create({ ...data, password: pass });
    // enviar e-mail
    return newUser;
  }
}
