import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDatabaseService } from './books.database.service';

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
}
