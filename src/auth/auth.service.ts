import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }
    async signIn(pass: string): Promise<{ access_token: string; }> {
        if (pass !== '1234') {
            throw new UnauthorizedException();
        }

        return {
            access_token: await this.jwtService.signAsync({ sub: "all" }),
        };

    }
}
