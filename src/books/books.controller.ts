import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    getBooks(@Query('author') author: number) {
        return this.booksService.getBooks();
    }

    @Get(':id')
    getOneBook(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.booksService.getBook(id);
        } catch (err) {
            throw new NotFoundException('Book not found in the library!');
        }
    }
}
