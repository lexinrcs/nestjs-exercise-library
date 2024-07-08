import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsDatabaseService } from './authors.database.service';
import { BooksService } from 'src/books/books.service';
import { BooksDatabaseService } from 'src/books/books.database.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsDatabaseService, BooksService, BooksDatabaseService]
})
export class AuthorsModule {}
