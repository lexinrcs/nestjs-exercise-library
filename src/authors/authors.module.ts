import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorsDatabaseService } from './authors.database.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsDatabaseService]
})
export class AuthorsModule {}
