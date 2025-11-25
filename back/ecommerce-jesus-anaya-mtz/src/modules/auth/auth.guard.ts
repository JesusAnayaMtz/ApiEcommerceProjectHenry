import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const token = request.headers.authorization?.split(' ')[1]; // Bearer <token> searado por espacio y toma el segundo elemento que es el token

        if(!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const secret = process.env.JWT_SECRET; //obtenemos la clave secreta de las variables de entorno
            //verificamos el token usando el servicio de jwt
            //y en el metodo verifyAsync le pasamos el token y la clave secreta
            const userPayload = this.jwtService.verify(token, {secret}); 
            userPayload.iat = new Date(userPayload.iat * 1000); //convertimos el iat a un objeto Date y una fehca legible
            userPayload.exp = new Date(userPayload.exp * 1000); //convertimos el exp a un objeto Date y una fehca legible
            //agregamos roles al request
            //userPayload.roles = [Role.Admin]; //aqui se pueden agregar los roles que se quieran PARA VALIDAR POR ROLES MAS ADELANTE
            //si el token es valido agregamos el payload al request para poder usarlo en el endpoint
            request.user = userPayload; //agregamos el payload al request
            return true; //si el token es valido devolvemos true para que se ejecute el endpoint
        } catch (error) {
            throw new UnauthorizedException('Token Invalido'); //si el token es invalido lanzamos una excepcion
        }
       
    }
}
