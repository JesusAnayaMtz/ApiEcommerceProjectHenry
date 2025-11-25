import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { ApiBearerAuth, ApiExtraModels, ApiParam, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/updateUserDto.dto";

@ApiTags('Users')
@Controller('users')
@ApiExtraModels(User)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiBearerAuth()
    @Get()
    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers() {
        try {
            return await this.usersService.getUsers();
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving users',
            };
        }
    }

    @ApiBearerAuth()
    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'El UUID del usuario que se desea consultar',
        example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
        type: 'string', 
        format: 'uuid', 
      })
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            return user;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving user',
            };
        }
    }


    @ApiBearerAuth()
    @Put(':id')
    @ApiParam({
        name: 'id',
        description: 'El UUID del usuario que se desea actualizar',
        example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
        type: 'string', 
        format: 'uuid', 
      })
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() userDto: UpdateUserDto) {
        try {
            const userUpdate = await this.usersService.updateUser(id, userDto);
            
            if (!userUpdate) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            return userUpdate;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error updating user',
            };
        }
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiParam({
        name: 'id',
        description: 'El UUID del usuario que se desea eliminar',
        example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
        type: 'string', 
        format: 'uuid', 
      })
    @HttpCode(200)
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const userDelete = await this.usersService.deleteUser(id);
            if (!userDelete) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            return {
                success: true,
                id: userDelete.id,
                message: 'User deleted successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error deleting user',
            };
        }
    }
}