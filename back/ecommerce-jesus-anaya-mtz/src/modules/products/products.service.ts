import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/createProduct.dto";
import { CategoriesRepository } from "../categories/categories.repository";
import { UpdateProductDto } from "./dto/updateProducts.dto";


@Injectable()
export class ProductsService {
    
    constructor(private productsRepository: ProductsRepository,
        private categoryRepository: CategoriesRepository
    ){

    }

    async getProducts(page: number = 1, limit: number = 5) {
        const products = await this.productsRepository.getProducts(page, limit);
        return products;
    }

    async addProducts(){
        return await this.productsRepository.addProducts();
    }

    async createProduct(productDto: CreateProductDto) {
    return await this.productsRepository.createProduct(productDto);
    }

    async updateProductService(id: string, productDto: UpdateProductDto): Promise<Product> {
        let category = undefined as any;

        if(productDto.categoryId) {
            category = await this.categoryRepository.getCategoryById(productDto.categoryId);
            if(!category) {
                throw new NotFoundException('Category not found');
            }
        }

        const productUpdate = await this.productsRepository.updateProduct(id, {...productDto, category});

        if(!productUpdate) {
            throw new NotFoundException('Product not found');
        }

        const productSaved = await this.productsRepository.getProductById(productUpdate.id);

        if (!productSaved) {
            throw new NotFoundException('Product not found after update');
        }

        return productSaved;
    }

    async getProductById(id: string) {
        const product = await this.productsRepository.getProductById(id);
        return product;
    }

    async deleteProduct(id: string) {
         const productToDelete = await this.productsRepository.getProductById(id);
        if(!productToDelete){
                throw new Error("User not found");
            }
    
        console.log(productToDelete);

        this.productsRepository.deleteProduct(id);
        return productToDelete
    }
}