import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsDatabaseService } from './authors.database.service';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsDatabaseService, AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
