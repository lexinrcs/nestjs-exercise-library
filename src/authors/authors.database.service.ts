import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { BooksService } from "src/books/books.service";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthorsDatabaseService {
  private authors: CreateAuthorDto[];

  constructor() {
    this.loadAuthors();
  }

  private loadAuthors() {
    const authorsFP = path.join(process.cwd(), 'data', 'authors.json');
    this.authors = JSON.parse(fs.readFileSync(authorsFP, 'utf8'));
    console.log('Initial authors:', this.authors);
  }

  createAuthor(newAuthor: CreateAuthorDto): CreateAuthorDto {
    this.authors.push(newAuthor);
    return newAuthor;
  }

  getAuthors(): CreateAuthorDto[] {
    return this.authors;
  }

  getAuthor(id: number): CreateAuthorDto {
    const author = this.authors.find(author => author.authorId === id);
    
    if(!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return author;
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): UpdateAuthorDto {
    this.authors = this.authors.map(author => {
      if(author.authorId === id) {
        return { ...author, ...updateAuthorDto };
      }
      return author;
    })

    return this.getAuthor(id);
  }

  deleteAuthor(id: number): CreateAuthorDto {
    const toBeRemoved = this.getAuthor(id);
    this.authors = this.authors.filter(author => author.authorId !== id);
    
    return toBeRemoved;
  }

  addBookToAuthor(authorId: number, bookId: number) {
    const author = this.getAuthor(authorId);

    author.books.push(bookId);
    
    return this.updateAuthor(authorId, author);
  }

  removeBookFromAuthor(authorId: number, bookId: number) {
    const author = this.getAuthor(authorId);

    author.books = author.books.filter(book => book !== bookId);

    return this.updateAuthor(authorId, author);
  }
}
