import { forwardRef, Inject, Injectable, NotFoundException, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDatabaseService } from './books.database.service';
import { AuthorsService } from 'src/authors/authors.service';
import { BookNotFound } from 'src/filters/book-notfound.exception';

@Injectable()
export class BooksService {
    constructor(
        private readonly booksDatabaseService: BooksDatabaseService,
        @Inject(forwardRef(() => AuthorsService)) private readonly authorsService: AuthorsService
    ) {
        this.booksDatabaseService = booksDatabaseService;
    }

     // create a book
     createBook(createBookDto: CreateBookDto) {
         const newBook = {
             ...createBookDto,
             bookId: Date.now(),
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
        const book = this.booksDatabaseService.getBook(id);

        if(!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        return this.booksDatabaseService.updateBook(id, updateBookDto);
    }

    deleteBook(id: number) {        
        const book= this.booksDatabaseService.deleteBook(id);

        if(!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

   addAuthorToBook(bookId: number, authorId: number){
        const book = this.getBook(bookId);
        const author = this.authorsService.getAuthor(authorId);

        if(!book.authors.includes(authorId)){
            this.booksDatabaseService.addAuthorToBook(bookId, authorId);
        }

        if(!author.books.includes(bookId)){
            this.authorsService.addBookToAuthor(authorId, bookId);
        }
        return this.getBook(bookId);
    }

    removeAuthorFromBook(bookId: number, authorId: number){
        const book = this.getBook(bookId);
        const author = this.authorsService.getAuthor(authorId);

        if(book.authors.includes(authorId)){
            this.booksDatabaseService.removeAuthorFromBook(bookId, authorId);
        }

        if(author.books.includes(bookId)){
            this.authorsService.removeBookFromAuthor(authorId, bookId);
        }

        return this.getBook(bookId);
    }
}
