import { IsString, IsInt, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";
export class CreateCatDto {
    @IsString()
    readonly name: string;

    @IsInt()
    @Min(0)
    @Type(() => Number)
    readonly age: number;

    @IsString()
    @MinLength(10, {message: "breed cannot be less than 10 chars long"})
    readonly breed: string;
}
