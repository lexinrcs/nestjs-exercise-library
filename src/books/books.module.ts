import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksDatabaseService } from './books.database.service';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorsDatabaseService } from 'src/authors/authors.database.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksDatabaseService, AuthorsService, AuthorsDatabaseService]
})
export class BooksModule {}
