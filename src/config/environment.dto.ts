import {IsString, IsEnum, IsBoolean, IsNumber} from "class-validator"
import { Transform, Type, Expose } from "class-transformer"

export enum ENVIROMENTS {
    DEVELOPMENT = "development", 
    PRODUCTION = "production",  
    TEST = "test", 
    PROVISION = "provision"
};
@Expose()
export class EnvDTO {
    @IsEnum(ENVIROMENTS)
    NODE_ENV: string = ENVIROMENTS.DEVELOPMENT;

    @IsNumber()
    @Type(() => Number)
    PORT: number = 3000; //default port is 3000

    @Expose()
    @IsBoolean()
    @Type(() => Boolean)
    API_AUTH_ENABLED : boolean;
}