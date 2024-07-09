import { forwardRef, Inject, Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDatabaseService } from './books.database.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { AuthorsService } from 'src/authors/authors.service';

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
            throw new NotFoundException();
        }
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        return this.booksDatabaseService.updateBook(id, updateBookDto);
    }

    deleteBook(id: number) {        
        try {
            return this.booksDatabaseService.deleteBook(id);
        } catch (err) {
            throw new NotFoundException();
        }
    }

   addAuthorToBook(bookId: number, authorId: number){
        try{
            const book = this.getBook(bookId);
            const author = this.authorsService.getAuthor(authorId);

            if(!book.authors.includes(authorId)){
                this.booksDatabaseService.addAuthorToBook(bookId, authorId);
            }

            if(!author.books.includes(bookId)){
                this.authorsService.addBookToAuthor(authorId, bookId);
            }
            return this.getBook(bookId);
        } catch(err) {
            throw new Error('Failed to add author to book. Book or author does not exist.');
        }
    }

    removeAuthorFromBook(bookId: number, authorId: number){
       try {
        const book = this.getBook(bookId);
        const author = this.authorsService.getAuthor(authorId);

        if(book.authors.includes(authorId)){
            this.booksDatabaseService.removeAuthorFromBook(bookId, authorId);
        }

        if(author.books.includes(bookId)){
            this.authorsService.removeBookFromAuthor(authorId, bookId);
        }

        return this.getBook(bookId);
       } catch (err) {
        throw new Error('Failed to remove author from book. Book does not exist.');
       }
    }
}
