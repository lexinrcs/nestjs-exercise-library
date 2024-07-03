import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateAuthorDto{
    @IsNotEmpty({message: "Must not be empty"})
    @IsInt({message: "Author ID must be an integer"})
    authorId: number;

    @IsString({message: "Name must be a string"})
    @IsNotEmpty({message: "Name must not be empty"})
    name: string;

    @IsString({message: "Biography must be a string"})
    biography: string;

    @IsInt({message: "Age must be an integer"})
    @Min(1, {message: "Age must be greater than 1"})
    age: number;

    @IsString({message: "Nationality must be a string"})
    nationality: string;
}