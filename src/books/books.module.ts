import { forwardRef, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksDatabaseService } from './books.database.service';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService, BooksDatabaseService],
  exports: [BooksService]
})
export class BooksModule {}
