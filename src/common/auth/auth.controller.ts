import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() data: { email: string; password: string }, @Res() res: Response) {
        try {
            const { access_token } = await this.authService.signIn(data.email, data.password, res);
            return res.json({ access_token });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        if(!req.user) return null
        console.log(req.user)
        return this.authService.userProfile(req);
    }
}
