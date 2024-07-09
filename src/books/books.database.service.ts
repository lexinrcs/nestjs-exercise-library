import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BooksDatabaseService {
  private books: CreateBookDto[];

  constructor() {
    this.loadBooks();
  }

  private loadBooks() {
    const booksFP = path.join(process.cwd(), 'data', 'books.json');
    this.books = JSON.parse(fs.readFileSync(booksFP, 'utf8'));
    console.log('Initial books:', this.books);
  }


  createBook(newBook: CreateBookDto): CreateBookDto {
    this.books.push(newBook);
    return newBook;
  }

  getBooks(authorId?: number): CreateBookDto[] {
    if (authorId) {
      return this.books.filter(book => book.authors.includes(authorId));
    }
    return this.books;
  }

  getBook(id: number): CreateBookDto {
    const book = this.books.find(book => book.bookId === id);
    
    if(!book){
      throw new NotFoundException();
    }

    return book;
  }

  updateBook(id: number, updateBookDto: UpdateBookDto): UpdateBookDto {
    this.books = this.books.map(book => {
      if(book.bookId === id){
        return {...book, ...updateBookDto};
      }
      return book;
    });

    return this.getBook(id);
  }

  deleteBook(id: number): CreateBookDto {
    const toBeRemoved = this.getBook(id);
    this.books = this.books.filter(book => book.bookId !== id);
    return toBeRemoved;
  }

  addAuthorToBook(bookId: number, authorId: number){
    const book = this.getBook(bookId);
    book.authors.push(authorId);

    return this.updateBook(bookId, book);
  }

  removeAuthorFromBook(bookId: number, authorId: number){
    const book = this.getBook(bookId);
    book.authors = book.authors.filter(a => a !== authorId);
    
    return this.updateBook(bookId, book);
  }
}
