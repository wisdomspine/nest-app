import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import chalk = require("chalk");

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super();
        console.log(authService);
    }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}
