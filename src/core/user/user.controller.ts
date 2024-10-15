import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() data: UserDto) {
    return await this.userService.createUser(data);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: Partial<UserDto>) {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }
}
