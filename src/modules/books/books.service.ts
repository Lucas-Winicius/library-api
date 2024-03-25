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
    return await this.prisma.book.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (book) return book;

    throw new NotFoundException();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  async remove(id: string) {
    return await this.prisma.book.delete({ where: { id } });
  }

  async search(searchTerm: string) {
    const books = await this.prisma.book.findMany({
      where: {
        OR: [
          {
            id: { contains: searchTerm, mode: 'insensitive' },
          },
          {
            name: { contains: searchTerm, mode: 'insensitive' },
          },
          {
            author: { contains: searchTerm, mode: 'insensitive' },
          },
          {
            category: { contains: searchTerm, mode: 'insensitive' },
          },
        ],
      },
    });

    return books;
  }
}
