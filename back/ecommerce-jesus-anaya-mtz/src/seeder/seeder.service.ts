import { Injectable } from "@nestjs/common";
import { CategoriesService } from "src/modules/categories/categories.service";
import { ProductsService } from "src/modules/products/products.service";

@Injectable()
export class SeederService {
    constructor(private readonly categoriesService: CategoriesService,
        private readonly productsService: ProductsService
    ){}

    async seed(){
        await this.categoriesService.addCategoriesService();
        await this.productsService.addProducts();
    }
}