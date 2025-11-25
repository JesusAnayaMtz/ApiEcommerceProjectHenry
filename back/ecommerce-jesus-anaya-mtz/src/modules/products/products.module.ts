import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Category } from "../categories/category.entity";
import { CategoriesModule } from "../categories/categories.module";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Product, Category]),
        CategoriesModule
      ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports:[ProductsService]
 
})
export class ProductsModule {}