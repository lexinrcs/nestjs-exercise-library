import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateAuthorDto{
    authorId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    biography: string;

    @IsInt()
    @Min(1)
    age: number;

    @IsString()
    nationality: string;

    books: number[];
}