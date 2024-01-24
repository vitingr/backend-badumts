import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {

  constructor (private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: createUserDto
    })

    return newUser
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async findOne(uuid: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: uuid
      }
    })

    return user
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }
}
