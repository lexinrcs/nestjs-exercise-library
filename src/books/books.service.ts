import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
     private books = [
        {
            title: 'The Hobbit',
            authorName: 'JRR Tolkien',
            authorId: 1,
            genre: ['Fantasy'],
            year: 1937,
            publisher: 'Houghton Mifflin Harcourt',
            description: 'A tale of adventure and danger',
            id: 1
        },
        {
            "title": "Harry Potter and the Sorcerer's Stone",
            "authorName": "JK Rowling",
            "authorId": 2,
            "genre": [
                "Fantasy"
            ],
            "year": 1997,
            "publisher": "Scholastic Corporation",
            "description": "A young wizard discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
            "id": 2
        }
     ]
    
     // create a book
    //  createBook(createBookDto: CreateBookDto) {
    //      const newBook = {
    //          ...createBookDto,
    //          id: Date.now(),
    //      };

    //      this.books.push();

    //      return newBook;
    //  }

     // read all books
    getBooks(author?: number) {
        if(author) {
            return this.books.filter((book) => book.authorId === author);
        }

        return this.books
    }

    // read a book by ID
    getBook(id: number) {
        const book = this.books.find((book) => book.id === id);

        if(!book) {
            throw new Error('Book not found in the library!');
        }

        return book;
    }

    updateBook(id: number, updateBookDto: UpdateBookDto) {
        this.books = this.books.map((book) => {
            if (book.id === id) {
                return {...book, ...updateBookDto};
            }
            return book;
        });

        return {message: "Book successfully updated!", updatedBook: this.getBook(id)};
    }

    deleteBook(id: number) {
        const removedBook = this.getBook(id);
        
        this.books = this.books.filter((book) => book.id !== id);

        return ({message: "Book successfully removed!", removedBook});
    }
}
