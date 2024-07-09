import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseFilters, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorBookDto } from './dto/author-book.dto';
import { AuthorNotFound } from 'src/filters/author-notfound.exception';

@Controller('authors')
@UseFilters(new AuthorNotFound())
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Post()
    createAuthor(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
        return this.authorsService.createAuthor(createAuthorDto);
    }

    @Post(':id/books')
    addBookToAuthor(@Param('id', ParseIntPipe) id: number, 
    @Body(new ValidationPipe()) addBookToAuthorDto: AuthorBookDto) {
        return this.authorsService.addBookToAuthor(id, addBookToAuthorDto.bookId);
    }

    @Get()
    getAuthors() {
        return this.authorsService.getAuthors();
    }

    @Get(':id')
    getOneAuthor(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.getAuthor(id);
    }

    @Put(':id')
    updateAuthor(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.updateAuthor(id, updateAuthorDto);
    }

    @Delete(':id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.deleteAuthor(id);
    }

    @Delete(':id/books')
    removeBookFromAuthor(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) removeBookFromAuthorDto: AuthorBookDto) {
        return this.authorsService.removeBookFromAuthor(id, removeBookFromAuthorDto.bookId);
    }
}
