import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SharedDataService } from '../shared/shared-data.service';
import { AuthorsService } from '../authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

@Injectable()
export class BooksDatabaseService {
  constructor(
    private readonly sharedDataService: SharedDataService,
    @Inject(forwardRef(() => AuthorsService)) private readonly authorsService: AuthorsService,
  ) {}

  createBook(newBook: CreateBookDto): CreateBookDto {
    const books = this.sharedDataService.getBooks();
    books.push(newBook);
    this.sharedDataService.updateBooks(books);
    return newBook;
  }

  getBooks(authorId?: number): CreateBookDto[] {
    const books = this.sharedDataService.getBooks();
    if (authorId) {
      return books.filter(book => book.authors.includes(authorId));
    }
    return books;
  }

  getBook(id: number): CreateBookDto {
    const books = this.sharedDataService.getBooks();
    return books.find(book => book.bookId === id);
  }

  updateBook(id: number, updateBookDto: UpdateBookDto): CreateBookDto {
    const books = this.sharedDataService.getBooks();
    const updatedBooks = books.map(book => (book.bookId === id ? { ...book, ...updateBookDto } : book));
    this.sharedDataService.updateBooks(updatedBooks);
    return this.getBook(id);
  }

  deleteBook(id: number): CreateBookDto {
    const books = this.sharedDataService.getBooks();
    const removedBook = this.getBook(id);
    const updatedBooks = books.filter(book => book.bookId !== id);
    this.sharedDataService.updateBooks(updatedBooks);
    return removedBook;
  }

  async addAuthorToBook(bookId: number, authorId: number): Promise<{ updatedBook: CreateBookDto; updatedAuthor: CreateAuthorDto }> {
    let book = this.getBook(bookId);
    let author = this.authorsService.getAuthor(authorId);

    if (!book.authors.includes(authorId) && !author.books.includes(bookId)) {
      book.authors.push(authorId);
      author.books.push(bookId);
    }

    book = this.updateBook(bookId, book);
    author = this.authorsService.updateAuthor(authorId, author);

    return { updatedBook: book, updatedAuthor: author };
  }

  async removeAuthorFromBook(bookId: number, authorId: number): Promise<{ updatedBook: CreateBookDto; updatedAuthor: CreateAuthorDto }> {
    let book = this.getBook(bookId);
    let author = this.authorsService.getAuthor(authorId);

    if (book.authors.includes(authorId)) {
      book.authors = book.authors.filter(a => a !== authorId);
      if (author.books.includes(bookId)) {
        author.books = author.books.filter(b => b !== bookId);
      }
    }

    book = this.updateBook(bookId, book);
    author = this.authorsService.updateAuthor(authorId, author);

    return { updatedBook: book, updatedAuthor: author };
  }
}
