import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/modules/users/users.repository";
import { AuthGuard } from "./auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";

@Module({
    providers: [AuthService, UsersRepository, AuthGuard],
    controllers: [AuthController],
    exports: [AuthGuard,AuthService],
    imports: [TypeOrmModule.forFeature([User]),]

})
export class AuthModule {

}