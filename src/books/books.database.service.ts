import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class BooksDatabaseService {

    private books: CreateBookDto[];

    constructor() {
        const booksFP = path.join(process.cwd(), 'data', 'books.json');
        
        this.books = JSON.parse(fs.readFileSync(booksFP, 'utf8'));
    }

     // create a book
     createBook(newBook: CreateBookDto) {
         this.books.push(newBook);

         return newBook;
     }

     // read all books
    getBooks(author?: number) {
        if(author) {
            return this.books.filter(book => book.authors.includes(author));
        }

        return this.books;
    }

    // read a book by ID
    getBook(id: number) {
        const book = this.books.find((book) => book.bookId === id);

        if(!book) {
            throw new Error('Book not found in the library!');
        }

        return book;
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        this.books = this.books.map((book) => {
            if (book.bookId === id) {
                return {...book, ...updateBookDto};
            }
            return book;
        });

        return this.getBook(id);
    }

    deleteBook(id: number) {
        const removedBook = this.getBook(id);
        
        this.books = this.books.filter((book) => book.bookId !== id);

        return removedBook;
    }
}
