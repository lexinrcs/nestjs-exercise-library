import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
    private authors = [
        {
            id: 1,
            name: 'JRR Tolkien',
            biography: "John Ronald Reuel Tolkien CBE FRSL was an English writer and philologist. He was the author of the high fantasy works The Hobbit and The Lord of the Rings. From 1925 to 1945, Tolkien was the Rawlinson and Bosworth Professor of Anglo-Saxon and a Fellow of Pembroke College, both at the University of Oxford.",
            age: 81,
            nationality: 'English'
        },
        {
            id: 2,
            name: 'JK Rowling',
            biography: "Joanne Rowling CH OBE FRSL, known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume fantasy series published from 1997 to 2007. ",
            age: 58,
            nationality: 'English'
        }
    ]

    createAuthor(createAuthorDto: CreateAuthorDto) {
        const newAuthor = {
            ...createAuthorDto,
            id: Date.now(),
        };
        
        this.authors.push(newAuthor);

        return newAuthor;
    }

    getAuthors() {
        return this.authors;
    }

    getAuthor(id: number) {
        const author = this.authors.find((author) => author.id === id);

        if(!author) {
            throw new Error('Author not found in the database!');
        }

        return author;
    }

    updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
        this.authors = this.authors.map((author) => {
            if(author.id === id) {
                return { ...author,...updateAuthorDto};
            }

            return author;
        });

        return {message: "Author successfully updated!", updatedAuthor: this.getAuthor(id)};
    }

    deleteAuthor(id: number) {
        const removedAuthor = this.getAuthor(id);
        this.authors = this.authors.filter((author) => author.id !== id);
        
        return {message: "Author successfully removed!", removedAuthor};
    }
}
