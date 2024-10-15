import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: (req: Request) => {
                const token = req.cookies['token'];
                return token || null
            },
            ignoreExpiration: false,
            secretOrKey: "kamina",
        });
    }

    async validate(payload: any) {
        console.log('JWT Payload:', payload); // Check the payload structure
        return { sub: payload.sub, username: payload.username }; // Adjust as necessary
    }

}