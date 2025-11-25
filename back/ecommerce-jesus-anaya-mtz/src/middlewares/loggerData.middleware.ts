import { NextFunction, Request, Response } from "express";

export function LoggerDataGlobal(req: Request, res:Response, next: NextFunction) {
    console.log("Inicia Middleware Global")
    console.log(`Ruta convocada ${req.url}`)
    console.log(`Metodo Utilizado ${req.method}`)
    console.log(`Fecha ${new Date()}`)
    next()
}