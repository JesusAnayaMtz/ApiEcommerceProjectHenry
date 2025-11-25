import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ValidateUserDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest(); 
        const user = request.body;

        if (!user.name || !user.email || !user.password || !user.address || !user.phone || !user.country || !user.city) {
            throw new BadRequestException('All fields are required');
        }
        

        if(user.name.length < 3) {
            throw new BadRequestException('Name must be at least 3 characters long');
        }
        if(user.email.length < 3) {
            throw new BadRequestException('Email must be at least 3 characters long');
        }
        if(user.password.length < 3) {
            throw new BadRequestException('Password must be at least 3 characters long');
        }
        if(user.address.length < 3) {
            throw new BadRequestException('Address must be at least 3 characters long');
        }
        if(user.phone.length < 3) {
            throw new BadRequestException('Phone must be at least 3 characters long');
        }
        if(user.country.length < 3) {
            throw new BadRequestException('Country must be at least 3 characters long');
        }
        if(user.city.length < 3) {
            throw new BadRequestException('City must be at least 3 characters long');
        }
        return next.handle();
    }
}

