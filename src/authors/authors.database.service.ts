import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { CreateBookDto } from "src/books/dto/create-book.dto";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class AuthorsDatabaseService {
    private authors: CreateAuthorDto[];
    private books: CreateBookDto[];

    constructor() {
        const authorsFP = path.join(process.cwd(), 'data', 'authors.json');
        const booksFP = path.join(process.cwd(), 'data', 'books.json');
        
        this.authors = JSON.parse(fs.readFileSync(authorsFP, 'utf8'));
        this.books = JSON.parse(fs.readFileSync(booksFP, 'utf8'));
    }


    createAuthor(newAuthor: CreateAuthorDto) {
        this.authors.push(newAuthor);

        return newAuthor;
    }

    getAuthors() {
        return this.authors;
    }

    getAuthor(id: number) {
        const author = this.authors.find((author) => author.authorId === id); 
        
        if(!author){
            throw new Error('Author not found');
        }

        return author;
    }

    updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
        this.authors = this.authors.map((author) => {
            if(author.authorId === id) {
                return { ...author,...updateAuthorDto};
            }

            return author;
        });

       return this.getAuthor(id);
    }

    deleteAuthor(id: number) {
        const removedAuthor = this.getAuthor(id);

        this.authors = this.authors.filter((author) => author.authorId !== id);
        
       return removedAuthor;
    }
}