import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { get } from 'http';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Post()
    createAuthor(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
        return this.authorsService.createAuthor(createAuthorDto);
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
}
