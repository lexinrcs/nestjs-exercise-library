import { ArrayMinSize, IsArray, IsInt, isNotEmpty, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateBookDto{
    bookId: number;


    @IsString({message: "Book title must be a string"})
    @IsNotEmpty({message: "Must not be empty"})
    title: string;

    @IsInt({message: "Author ID must be an integer"})
    @IsNotEmpty({message: "Author ID must not be empty"})
    authors: number[];

    @IsArray({message: "Genre must be an array"})
    @IsNotEmpty({message: "Genre must not be empty"})
    genre: string[];

    @Min(1900, {message: "Year must be greater than 1900"})
    @Max(2024, {message: "Year must be less than 2024"})
    year: number;

    @IsString({message: "Publisher must be a string"})
    publisher: string;

    @IsString({message: "Description must be a string"})
    description: string;
}