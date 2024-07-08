import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { BooksService } from "src/books/books.service";
import { CreateBookDto } from "src/books/dto/create-book.dto";
import { SharedDataService } from "src/shared/shared-data.service";

@Injectable()
export class AuthorsDatabaseService {
  constructor(
    private readonly sharedDataService: SharedDataService,
    @Inject(forwardRef(() => BooksService)) private readonly booksService: BooksService,
  ) {}

  createAuthor(newAuthor: CreateAuthorDto): CreateAuthorDto {
    const authors = this.sharedDataService.getAuthors();
    authors.push(newAuthor);
    this.sharedDataService.updateAuthors(authors);
    return newAuthor;
  }

  getAuthors(): CreateAuthorDto[] {
    return this.sharedDataService.getAuthors();
  }

  getAuthor(id: number): CreateAuthorDto {
    const authors = this.sharedDataService.getAuthors();
    return authors.find(author => author.authorId === id);
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): CreateAuthorDto {
    const authors = this.sharedDataService.getAuthors();
    const updatedAuthors = authors.map(author => (author.authorId === id ? { ...author, ...updateAuthorDto } : author));
    this.sharedDataService.updateAuthors(updatedAuthors);
    return this.getAuthor(id);
  }

  deleteAuthor(id: number): CreateAuthorDto {
    const authors = this.sharedDataService.getAuthors();
    const removedAuthor = this.getAuthor(id);
    const updatedAuthors = authors.filter(author => author.authorId !== id);
    this.sharedDataService.updateAuthors(updatedAuthors);
    return removedAuthor;
  }

  async addBookToAuthor(authorId: number, bookId: number): Promise<{ updatedBook: CreateBookDto; updatedAuthor: CreateAuthorDto }> {
    let book = this.booksService.getBook(bookId);
    let author = this.getAuthor(authorId);

    if (!author.books.includes(bookId) && !book.authors.includes(authorId)) {
      author.books.push(bookId);
      book.authors.push(authorId);
    }

    book = this.booksService.updateBook(bookId, book);
    author = this.updateAuthor(authorId, author);

    return { updatedBook: book, updatedAuthor: author };
  }

  async removeBookFromAuthor(authorId: number, bookId: number): Promise<{ updatedBook: CreateBookDto; updatedAuthor: CreateAuthorDto }> {
    let book = this.booksService.getBook(bookId);
    let author = this.getAuthor(authorId);

    if (author.books.includes(bookId)) {
      author.books = author.books.filter(b => b !== bookId);
      if (book.authors.includes(authorId)) {
        book.authors = book.authors.filter(a => a !== authorId);
      }
    }

    book = this.booksService.updateBook(bookId, book);
    author = this.updateAuthor(authorId, author);

    return { updatedBook: book, updatedAuthor: author };
  }
}
