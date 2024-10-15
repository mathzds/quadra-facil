import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/core/user/dto/user-dto';
import { UserService } from 'src/core/user/user.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userServices: UserService,
        private jwtServices: JwtService
    ) { }


    async signIn(email: string, pass: string, res: Response): Promise<{ access_token: string }> {
        const user = await this.userServices.findUserByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.email, username: user.name };
        const access_token = await this.jwtServices.signAsync(payload);
        res.cookie("token", access_token, { httpOnly: true, secure: false });
        return { access_token };
    }


    async userProfile(req: any) {
        console.log(req.user)
        const user = await this.userServices.findUserByEmail(req.user.sub);
        return user
    }
}
