import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { LoggerService } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly jwt: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail({
        email: loginDto.email,
      });
      if (!user) throw new NotFoundException('user not found');

      if (user.password !== loginDto.password) {
        throw new UnauthorizedException('email or password is not valid');
      }

      const { password, ...rest } = user;
      const token = this.jwt.sign(rest);

      return {
        token,
        user: rest,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  loggedInUser() {}
}
