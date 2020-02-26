import { IsString, Length, IsOptional, Matches } from "class-validator";

export class AuthorDto {
    @IsOptional({groups: ["create"]})
    @IsString({groups: ["update", "create"]})
    @Length(4, 10, {groups: ["update", "create"]})
    author: string;

    
    birthday: Date;
}