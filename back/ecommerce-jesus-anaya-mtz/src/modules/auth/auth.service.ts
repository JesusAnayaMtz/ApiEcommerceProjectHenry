import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/modules/users/users.repository";
import { CreateUserDto } from "../users/dto/createUserDto.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/roles.enum";


@Injectable()
export class AuthService {
    

    constructor(private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) {
    }

    async signUp(createUserDto: CreateUserDto) {
        const userExists = await this.userRepository.getUserByEmail(createUserDto.email)
        if(userExists) {
            throw new BadRequestException('El Email ya está en uso');
        }

        if(createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException('El password y confirmPassword no coinciden');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // hasheamos la contraseña con bcrypt

        if(!hashedPassword){ // si no se pudo hashear la contraseña
            throw new BadRequestException('Error hashing password'); //lanzamos una excepcion
        }

        this.userRepository.createUser({...createUserDto, password: hashedPassword});

        const {password, confirmPassword, ...userExceptionPassword} = createUserDto; // Excluimos password y confirmPassword del objeto user
        
        return userExceptionPassword; // Devolvemos el usuario sin password ni confirmPassword

    }

    async signin(email: string, password: string) {
        const userFound = await this.userRepository.getUserByEmail(email);
        

        if(!userFound){ //si no existe lanzamos una excepcion
            throw new BadRequestException('Invalid credentials');
        }

       const isPasswordMatching = await bcrypt.compare(password, userFound?.password)
        if(!isPasswordMatching){ //si no es valida lanzamos una excepcion
            throw new BadRequestException('Invalid credentials');
        }

        const payload = {
            id: userFound.id,
            email: userFound.email,
            isAdmin: userFound.isAdmin,
            roles: [userFound.isAdmin ? Role.Admin: '']
        }

        const token = this.jwtService.sign(payload);

        return {success: 'User signed in successfully', token}
    }

}