import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDatabaseService } from './authors.database.service';
import { HttpExceptionFilter } from 'src/http-exception.filters';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
@Injectable()
export class AuthorsService {
    constructor(private readonly authorsDatabaseService: AuthorsDatabaseService) {
        this.authorsDatabaseService = authorsDatabaseService;
    }
    
    createAuthor(createAuthorDto: CreateAuthorDto) {
        const newAuthor = {
            ...createAuthorDto,
            id: Date.now(),
        };

        return this.authorsDatabaseService.createAuthor(newAuthor);
    }

    getAuthors() {
        return this.authorsDatabaseService.getAuthors();
    }

    getAuthor(id: number) {
        try {
            return this.authorsDatabaseService.getAuthor(id);
        } catch (err) {
            throw new NotFoundException('Author not found in the database!');
        }
    }

    updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
       return this.authorsDatabaseService.updateAuthor(id, updateAuthorDto);
    }

    deleteAuthor(id: number) {
        try{
            return this.authorsDatabaseService.deleteAuthor(id);
        } catch (err) {
            throw new NotFoundException('Author to be deleted is not found in the database!');
        }
    }

    async addBookToAuthor(authorId: number, bookId: number): Promise<{updatedAuthor:CreateAuthorDto}> {
        try {
            return this.authorsDatabaseService.addBookToAuthor(authorId, bookId);
        } catch (err) {
            throw new Error('Failed to add book to author. Author or book does not exist.');
        }
    }

    async removeBookFromAuthor(authorId: number, bookId: number): Promise<{updatedAuthor:CreateAuthorDto}> {
        try {
            return this.authorsDatabaseService.removeBookFromAuthor(authorId, bookId);
        } catch (err) {
            throw new Error('Failed to remove book from author. Author or book does not exist.');
        }
    }
}
