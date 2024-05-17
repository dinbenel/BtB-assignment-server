import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { IReq } from 'src/types/http.type';
import { IUserWithoutPassword } from 'src/types/user.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<IReq>();
    const [_, token] = req.headers.authorization?.split(' ');

    if (!token) return false;
    const userFromToken = this.jwt.verify<IUserWithoutPassword>(token);

    if (!userFromToken) return false;

    const dbUser = await this.userService.findOne(userFromToken.id);
    req.user = {
      ...dbUser,
    };
    return true;
  }
}
