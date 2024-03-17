import { Injectable } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async recommendations() {
    try {
      const books: BooksRequest[] = await this.prisma.book.findMany();

      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const recentBooks = books
        .filter((item) => new Date(item.createdAt).getTime() >= sevenDaysAgo)
        .map((book) => ({ ...book, tag: 'Novidade' }));

      const recommendedBooks = [];
      while (
        recommendedBooks.length < 20 &&
        recommendedBooks.length < books.length
      ) {
        const randomIndex = Math.floor(Math.random() * books.length);
        const book = books[randomIndex];
        recommendedBooks.push({ ...book, tag: 'Recomendação' });
      }

      return [...recentBooks, ...recommendedBooks].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1,
      );
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }
}
