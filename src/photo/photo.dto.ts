import { IsString, IsNumberString, IsOptional, IsObject, IsJSON, IsNumber, Length, IsArray } from "class-validator";
import { Transform, Type } from "class-transformer";
import e = require("express");
import { Author } from "src/author/author.entity";
import { CrudValidationGroups } from "@nestjsx/crud";


export class PhotoDto {

@IsString({groups: ["update", "create"]})
name: string;

@IsString({groups: ["update", "create"]})
description: string;

@IsOptional({groups: ["update", "create"]})
isPublished: boolean;

@IsString({groups: ["update"]})
filename: string;

@IsNumberString({groups: ["add_entity", "delete_entity", "create", "update"], each: true})
authorsIds: number[] = [];

@IsNumberString({groups: ["update"], each:true})
count: number[];

@IsObject({
    groups: ["create"],
    each: true
})
authors: Author[]

}



