import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDatabaseService } from './books.database.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

@Injectable()
export class BooksService {
    constructor(private readonly booksDatabaseService: BooksDatabaseService) {
        this.booksDatabaseService = booksDatabaseService;
    }

     // create a book
     createBook(createBookDto: CreateBookDto) {
         const newBook = {
             ...createBookDto,
             id: Date.now(),
         };
        
         return this.booksDatabaseService.createBook(newBook);

     }

     // read all books
    getBooks(author?: number) {
        if(author) {
            return this.booksDatabaseService.getBooks(author);
        }

        return this.booksDatabaseService.getBooks();
    }

    // // read a book by ID
    getBook(id: number) {
        try {
            return this.booksDatabaseService.getBook(id);
        } catch(err) {
            throw new NotFoundException('Book not found in the library!');
        }
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        return this.booksDatabaseService.updateBook(id, updateBookDto);
    }

    deleteBook(id: number) {        
        try {
            return this.booksDatabaseService.deleteBook(id);
        } catch (err) {
            throw new NotFoundException('Book to be deleted not found in the library!');
        }
    }

    async addAuthorToBook(bookId: number, authorId: number): Promise<{updatedBook:CreateBookDto, updatedAuthor:CreateAuthorDto}>  {
        try{
            return this.booksDatabaseService.addAuthorToBook(bookId, authorId);
        } catch(err) {
            throw new Error('Failed to add author to book. Book or author does not exist.');
        }
    }

    async removeAuthorFromBook(bookId: number, authorId: number): Promise<{updatedBook:CreateBookDto, updatedAuthor:CreateAuthorDto}>  {
       try {
        return this.booksDatabaseService.removeAuthorFromBook(bookId, authorId);
       } catch (err) {
        throw new Error('Failed to remove author from book. Book does not exist.');
       }
    }
}
