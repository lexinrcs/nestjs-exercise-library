import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsDatabaseService } from './authors.database.service';
import { BooksService } from 'src/books/books.service';
import { BooksDatabaseService } from 'src/books/books.database.service';
import { BooksModule } from 'src/books/books.module';
import { SharedDataService } from 'src/shared/shared-data.service';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [SharedDataService,AuthorsDatabaseService, AuthorsService, BooksService, BooksDatabaseService],
})
export class AuthorsModule {}
