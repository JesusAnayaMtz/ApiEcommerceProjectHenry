import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ValidateProductDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest(); 
        const product = request.body;
        if (!product.name || !product.price || !product.description || !product.stock || !product.categoryId) {

            throw new BadRequestException('All fields are required');
        }
        if (product.name.length < 3) {
            throw new BadRequestException('Name must be at least 3 characters long');
        }
        if (product.description.length < 3) {
            throw new BadRequestException('Description must be at least 3 characters long');
        }
        if (product.price < 0) {
            throw new BadRequestException('Price must be a positive number');
        }

        if (typeof product.name !== 'string') {
            throw new BadRequestException('Name must be a string');
        }
        if (typeof product.price !== 'number') {
            throw new BadRequestException('Price must be a number');
        }
        if (typeof product.description !== 'string') {
            throw new BadRequestException('Description must be a string');
        }
        return next.handle();
    }
}