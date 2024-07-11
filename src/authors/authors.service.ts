import { forwardRef, Inject, Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDatabaseService } from './authors.database.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class AuthorsService {
    constructor(
        private readonly authorsDatabaseService: AuthorsDatabaseService,
        @Inject(forwardRef(() => BooksService)) private readonly booksService: BooksService
    ) {
        this.authorsDatabaseService = authorsDatabaseService;
    }
    
    createAuthor(createAuthorDto: CreateAuthorDto) {
        const newAuthor = {
            ...createAuthorDto,
            authorId: Date.now(),
        };

        return this.authorsDatabaseService.createAuthor(newAuthor);
    }

    getAuthors() {
        return this.authorsDatabaseService.getAuthors();
    }

    getAuthor(id: number) {
        const author = this.authorsDatabaseService.getAuthor(id);
        
        if(!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        return author;
    }

    updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
       return this.authorsDatabaseService.updateAuthor(id, updateAuthorDto);
    }

    deleteAuthor(id: number) {
        const author =  this.authorsDatabaseService.deleteAuthor(id);
        if(!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        return author;
    }

    addBookToAuthor(authorId: number, bookId: number){
        const author = this.getAuthor(authorId);
        const book = this.booksService.getBook(bookId);

        if(!author.books.includes(bookId)){
            this.authorsDatabaseService.addBookToAuthor(authorId, bookId);
        }

        if(!book.authors.includes(authorId)){
            this.booksService.addAuthorToBook(bookId, authorId);
        }

        return this.getAuthor(authorId);

    }

    removeBookFromAuthor(authorId: number, bookId: number){
        const author = this.getAuthor(authorId);
        const book = this.booksService.getBook(bookId);

        if(author.books.includes(bookId)){
            this.authorsDatabaseService.removeBookFromAuthor(authorId, bookId);
        }

        if(book.authors.includes(bookId)){
            this.booksService.removeAuthorFromBook(bookId, authorId);
        }

        return this.getAuthor(authorId);
    }
}
