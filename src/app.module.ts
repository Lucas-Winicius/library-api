import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthMiddleware } from './modules/books/books.middleware';
import { PrismaService } from './services/prisma.service';
import { AuthMiddlewareUser } from './modules/users/users.middleware';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'books', method: RequestMethod.GET },
        { path: 'books/(.*)', method: RequestMethod.GET },
      )
      .forRoutes('books');

    consumer
      .apply(AuthMiddlewareUser)
      .exclude(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/(.*)', method: RequestMethod.GET },
        { path: 'users/signup', method: RequestMethod.POST },
        { path: 'users/signin', method: RequestMethod.POST },
      )
      .forRoutes('users');
  }
}
