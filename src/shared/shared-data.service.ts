import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { CreateAuthorDto } from '../authors/dto/create-author.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SharedDataService {
  private books: CreateBookDto[];
  private authors: CreateAuthorDto[];

  constructor() {
    this.loadBooks();
    this.loadAuthors();
  }

  private loadBooks() {
    const booksFP = path.join(process.cwd(), 'data', 'books.json');
    this.books = JSON.parse(fs.readFileSync(booksFP, 'utf8'));
    console.log('Initial books:', this.books);
  }

  private loadAuthors() {
    const authorsFP = path.join(process.cwd(), 'data', 'authors.json');
    this.authors = JSON.parse(fs.readFileSync(authorsFP, 'utf8'));
    console.log('Initial authors:', this.authors);
  }

  getBooks(): CreateBookDto[] {
    return this.books;
  }

  getAuthors(): CreateAuthorDto[] {
    return this.authors;
  }

  updateBooks(books: CreateBookDto[]) {
    this.books = books;
    console.log('Updated books:', this.books);
  }

  updateAuthors(authors: CreateAuthorDto[]) {
    this.authors = authors;
    console.log('Updated authors:', this.authors);
  }
}
