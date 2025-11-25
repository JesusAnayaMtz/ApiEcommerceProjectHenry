import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/createUserDto.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/loginUser.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Post('signin')
    async signin(@Body() loginDto: LoginUserDto) {
        try {
            const user = await this.authService.signin(loginDto.email, loginDto.password);
            return user;
        } catch (error) {
            return {
                success: false,
                message: 'Invalid Credentials',
            }
        }
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.authService.signUp(createUserDto);
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error creating user',
            };
        }
    }

}