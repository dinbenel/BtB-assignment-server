import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, FindUserByMailDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  login(@Body() findByMailDto: FindUserByMailDto) {
    return this.userService.findOneByEmail(findByMailDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }
}
