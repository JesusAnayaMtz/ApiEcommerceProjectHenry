import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ValidateProductDataInterceptor } from "src/interceptors/validateproductdata.interceptor";
import { AuthGuard } from "../auth/auth.guard";
import { Product } from "./product.entity";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { ApiBearerAuth, ApiExtraModels, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/createProduct.dto";
import { UpdateProductDto } from "./dto/updateProducts.dto";

@ApiTags('Products')
@Controller('products')
@ApiExtraModels(Product)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    
    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de resultados por página', example: 5 })
    async getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
        try {
            const pageNumber = page ? Number(page) : 1;
            const limitNumber = limit ? Number(limit) : 5;
            return await this.productsService.getProducts(pageNumber, limitNumber);
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving products',
            };
        }
    }

    @Get('seeder')
    async addProducts() {
        try {
            return await this.productsService.addProducts();
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error adding products',
            };
        }
    }

    @Post()
    @HttpCode(201)
    @UseInterceptors(ValidateProductDataInterceptor)
    async createProduct(@Body() productDto: CreateProductDto) {
        try {
            return await this.productsService.createProduct(productDto);
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error creating product',
            };
        }
    }

    @ApiBearerAuth()
    @Put(':id')
    @ApiParam({
    name: 'id',
    description: 'El UUID del producto que se desea actualizar.',
    example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
    type: 'string', 
    format: 'uuid', 
  })
    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: UpdateProductDto) {
        try {
            const productUpdate = await this.productsService.updateProductService(id, product);
            return productUpdate;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error updating product',
            };
        }
    }

    @Get(':id')
    @ApiParam({
    name: 'id',
    description: 'El UUID del producto que se desea consultar.',
    example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
    type: 'string', 
    format: 'uuid', 
  })
    @HttpCode(200)
    async getProductById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const product = await this.productsService.getProductById(id);
            if (!product) {
                return {
                    success: false,
                    message: 'Product not found',
                };
            }
            return product;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error retrieving product',
            };
        }
    }

    @Delete(':id')
     @ApiParam({
    name: 'id',
    description: 'El UUID del producto que se desea eliminar.',
    example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
    type: 'string', 
    format: 'uuid', 
  })
    @HttpCode(200)
    async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const productDelete = await this.productsService.deleteProduct(id);
            if (!productDelete) {
                return {
                    success: false,
                    message: 'Product Not Found',
                };
            }
            return {
                success: true,
                id: productDelete.id,
                message: 'Product deleted successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error deleting product',
            };
        }
    }
}