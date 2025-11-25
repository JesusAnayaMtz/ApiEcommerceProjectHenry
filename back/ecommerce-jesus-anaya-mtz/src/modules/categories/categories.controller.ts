import { Controller, Get, Post, Body, UseGuards, Param, ParseUUIDPipe } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiExtraModels, ApiParam, ApiTags } from "@nestjs/swagger";
import { Category } from "./category.entity";



@ApiTags('Categories')
@Controller('categories')
@ApiExtraModels(Category)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @Get('seeder')
    async addCategories() {
        try {
            return await this.categoriesService.addCategoriesService();
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error adding categories',
            };
        }
    }

    @Get()
    async getCategories() {
        try {
            return await this.categoriesService.getCategoriesService();
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving categories',
            };
        }
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'El UUID de la categoria a consultar.',
        example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
        type: 'string', 
        format: 'uuid', 
      })
    async getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.categoriesService.getCategoryByIdService(id);
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving category',
            }
        }
    }

}