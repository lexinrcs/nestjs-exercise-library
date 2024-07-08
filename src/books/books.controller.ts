import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    // @Post()
    // createBook(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    //     return this.booksService.createBook(createBookDto);
    // }

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

    @Put(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
        return this.booksService.updateBook(id, updateBookDto);   
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.deleteBook(id);
    }
}
