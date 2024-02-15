import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({ data: createBookDto });
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (book) return book;

    throw new NotFoundException();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
