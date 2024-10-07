import { NextFunction, Request, Response } from "express";
import { ManageToken } from "./utils/ManageToken";
import { RefreshTokenDTO } from "./interface/RefreshTokenDTO";
import { CookieConfig } from "./utils/CookieConfig";
import {  JwtPayload } from "jsonwebtoken";
import { TokenDTO } from "./interface/TokenDTO";
import { UserDataToken } from "./interface/UserDataToken";

const CheckToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenCookieName = "token";
    console.log("CHECK TOKEN");
    
    try {
        let token: string | undefined = res.locals.token || req.cookies[tokenCookieName];
        console.log(token);
        
        if(token){
        
            token = token.replace("Bearer ", "").trim();

            console.log("TOKEN A VALIDAR : "+token);
            

            const validateToken: JwtPayload | null = await ManageToken.ValidateToken(token);
            if(!validateToken){

                throw new Error("El token no es valido");
                
            } 
            console.log("TOKEN VERIFICADO EN CHECK");

            const email = validateToken["custom_email_claim"];
            const authName = validateToken["custom_name_claim"];
            const authId = validateToken["sub"];

            if(email && authName && authId){

                const userData:UserDataToken = {
                    authId,
                    authName,
                    email,
                    token
                }

                res.locals.userData = userData;
                console.log(res.locals["userData"] as UserDataToken);
                
                console.log("Token Validado y Datos de Usuario Agregados al Contexto");


            }else{
                throw Error("No esta en Email ni el Nombre en el token, chequee la configuracion en auth0");
            }

        }
        next();
    } catch (error:any) {
        console.error("Error en el middleware CheckToken:", error.message);
        res.status(401).json({
            message: error.message || "Error de autenticación"
        });
    }
}

const SetToken = async (req: Request, res: Response, next: NextFunction) => {
    
    const tokenCookieName = "token";
    const refreshTokenCookieName = "refresh-token";

    try {
        console.log(req.cookies[tokenCookieName]);
        
        if (req.cookies[tokenCookieName] !== undefined) {
            console.log("Existe en las COOKIES EL TOKEN");
            
            let token: string = req.cookies[tokenCookieName];
            token = token.replace("Bearer ", "").trim();

            const validateToken: JwtPayload | null = await ManageToken.ValidateToken(token);
            //si el token no es valido se intenta recrear a travez del refresh token
            if (validateToken == null) {
                const refreshToken: string = req.cookies[refreshTokenCookieName]
                const createToken: TokenDTO = await ManageToken.GetTokenWRT(refreshToken);

                res.cookie(tokenCookieName, `Bearer ${createToken.accessToken}`, CookieConfig());
                res.cookie(refreshTokenCookieName, refreshToken, CookieConfig({
                    maxAge: 214748
                }));
                res.locals.token = `Bearer ${createToken.accessToken}`; 
                
                console.log("Se creo un nuevo token con RToken");

            } else {

                console.log("Token Validado en SetToken");

            }


        } else {

            const code: string | undefined = req.query["code"]?.toString();
            console.log(code);
            
            if (code) {
                const createRToken: RefreshTokenDTO = await ManageToken.GetTokenWCode(code);
                
                res.cookie(tokenCookieName, `Bearer ${createRToken.access_token}`, CookieConfig());
                res.cookie(refreshTokenCookieName, createRToken.refresh_token, CookieConfig({
                    maxAge: 214748
                }));
                console.log(createRToken.access_token);
                
                res.locals.token = `Bearer ${createRToken.access_token}`; 
                console.log("TOKEN CREADO CON EL CODIGO");
            }else{
                throw new Error("No se recibio codigo de registro")
            }

        }
        next();
    } catch (error:any) {
        console.error("Error en el middleware SetToken: ", error.message);
        res.status(401).json({ error: "Error de autenticación", message: error.message });
    }
};


export const MiddlewareAuth0 = {
    SetToken,
    CheckToken
};