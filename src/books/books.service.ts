import { Injectable, Param, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class BooksService {
     private books = [
        {
            id: 1,
            title: 'The Hobbit',
            authorName: 'JRR Tolkien',
            authorId: 1,
            genre: ['Fantasy'],
            year: 1937,
            publisher: 'Houghton Mifflin Harcourt',
            description: 'A tale of adventure and danger',
        }
     ]


    getBooks(author?: number) {
        if(author) {
            return this.books.filter((book) => book.authorId === author);
        }

        return this.books
    }

    getBook(id: number) {
        const book = this.books.find((book) => book.id === id);

        if(!book) {
            throw new Error('Book not found in the library!');
        }

        return book;
    }
}
