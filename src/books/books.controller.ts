import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseFilters, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookAuthorDto } from './dto/book-author.dto';
import { BookNotFound } from 'src/filters/book-notfound.exception';

@Controller('books')
// @UseFilters(new BookNotFound())
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    createBook(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
        return this.booksService.createBook(createBookDto);
    }

    @Post(':id/authors')
    addAuthorToBook(
      @Param('id', ParseIntPipe) bookId: number,
      @Body(new ValidationPipe()) addAuthorToBookDto: BookAuthorDto
    ) {
      return this.booksService.addAuthorToBook(bookId, addAuthorToBookDto.authorId);
    }

    @Get()
    getBooks(@Query('author') author: number) {
        return this.booksService.getBooks();
    }

    @Get(':id')
    getOneBook(@Param('id', ParseIntPipe) id: number) {
      return this.booksService.getBook(id);
    }

    @Put(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
        return this.booksService.updateBook(id, updateBookDto);   
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.deleteBook(id);
    }

    @Delete(':id/authors')
    removeAuthorFromBook(
      @Param('id', ParseIntPipe) bookId: number,
      @Body(new ValidationPipe()) removeAuthorFromBookDto: BookAuthorDto
    ) {
      return this.booksService.removeAuthorFromBook(bookId, removeAuthorFromBookDto.authorId);
    }
}
