import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksDatabaseService } from './books.database.service';
import { SharedDataService } from 'src/shared/shared-data.service';
import { AuthorsModule } from 'src/authors/authors.module';
import { AuthorsDatabaseService } from 'src/authors/authors.database.service';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService, BooksDatabaseService, SharedDataService, AuthorsDatabaseService, AuthorsService],
})
export class BooksModule {}
