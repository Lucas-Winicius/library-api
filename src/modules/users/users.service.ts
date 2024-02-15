import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.nick = createUserDto.nick.toLowerCase();
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (e) {
      if (e.code === 'P2002')
        throw new ConflictException(
          'User already exists.',
          `Try another ${e.meta.target}`,
        );

      throw e;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) return user;

    throw new NotFoundException();
  }

  async findOneByNick(nick: string) {
    const user = await this.prisma.user.findUnique({ where: { nick } });

    if (user) return user;

    throw new NotFoundException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
