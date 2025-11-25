import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { AuthGuard } from "../auth/auth.guard";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    imports: [AuthModule,TypeOrmModule.forFeature([User])]
})
export class UsersModule {
    
}
