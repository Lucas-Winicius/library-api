import { Injectable } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import random from './services/random.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async recomendations() {
    const books = await this.prisma.book.findMany();
    const recomendations = [];
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentBooks = books.filter(
      (item) => new Date(item.createdAt).getTime() >= sevenDaysAgo,
    );

    while (recomendations.length <= (books.length >= 20 ? 20 : books.length)) {
      const index = random(0, books.length - 1);
      recomendations.push(books[index]);
    }

    return { recentBooks, recomendations };
  }
}
