import { Injectable, NotFoundException } from '@nestjs/common';
import BaseRepository from 'src/common/utils/base.repository';
import { Roles, UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UserService extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async createUser(data: UserDto): Promise<UserEntity> {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async updateUser(id: number, data: Partial<UserDto>): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = this.repository.merge(user, data);
    return await this.repository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }
}
