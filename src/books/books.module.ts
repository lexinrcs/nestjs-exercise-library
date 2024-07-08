import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksDatabaseService } from './books.database.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksDatabaseService]
})
export class BooksModule {}
