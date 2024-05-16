import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, FindUserByMailDto } from './dto/user.dto';
import { DbService } from 'src/db/db.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly logger: LoggerService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.dbService.user.findMany();
  }

  findOne(id: string) {
    return this.dbService.user.findUnique({ where: { id } });
  }

  findOneByEmail({ email }: FindUserByMailDto) {
    return this.dbService.user.findUnique({ where: { email } });
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }
}
