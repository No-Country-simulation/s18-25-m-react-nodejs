import { UnauthorizedError } from '@/utils/errors';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RefreshTokenDTO } from './interface/RefreshTokenDTO';
import { TokenDTO } from './interface/TokenDTO';
import { UserDataToken } from './interface/UserDataToken';
import { CookieConfig } from './utils/CookieConfig';
import { ManageToken } from './utils/ManageToken';

const tokenCookieName = 'token';

const CheckToken = async (req: Request, res: Response, next: NextFunction) => {
  try {

    let token: string | undefined = req.cookies[tokenCookieName] || res.locals.token;

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    token = token.replace('Bearer ', '').trim();

    const validateToken: JwtPayload | null = await ManageToken.ValidateToken(token);

    if (!validateToken) {
      throw new UnauthorizedError('El token no es valido');
    }

    const email = validateToken['custom_email_claim'];
    const authName = validateToken['custom_name_claim'];
    const authId = validateToken['sub'];

    if (email && authName && authId) {
      const userData: UserDataToken = {
        authId,
        authName,
        email,
        token,
      };

      res.locals.userData = userData;

    }
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    for (const cookieName in req.cookies) {
      res.clearCookie(cookieName);
    }
    res.status(401).json({
      message: error.message || 'Error de autenticación',
    });
  }
};

const SetToken = async (req: Request, res: Response, next: NextFunction) => {
  const tokenCookieName = 'token';
  const refreshTokenCookieName = 'refresh-token';

  try {
    if (req.cookies[tokenCookieName] !== undefined) {
      console.log('Existe en las COOKIES EL TOKEN');

      let token: string = req.cookies[tokenCookieName];
      token = token.replace('Bearer ', '').trim();

      const validateToken: JwtPayload | null = await ManageToken.ValidateToken(token);
      //si el token no es valido se intenta recrear a travez del refresh token
      if (validateToken == null) {
        const refreshToken: string = req.cookies[refreshTokenCookieName];
        const createToken: TokenDTO = await ManageToken.GetTokenWRT(refreshToken);

        res.cookie(tokenCookieName, `Bearer ${createToken.accessToken}`, CookieConfig());
        res.cookie(
          refreshTokenCookieName,
          refreshToken,
          CookieConfig({
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }),
        );
        res.locals.token = `Bearer ${createToken.accessToken}`;

        console.log('Se creo un nuevo token con RToken');
      } else {
        console.log('Token Validado en SetToken');
      }
    } else {
      const code: string | undefined = req.query['code']?.toString();

      if (code) {
        const createRToken: RefreshTokenDTO = await ManageToken.GetTokenWCode(code);

        res.cookie(tokenCookieName, `Bearer ${createRToken.access_token}`, CookieConfig());
        res.cookie(
          refreshTokenCookieName,
          createRToken.refresh_token,
          CookieConfig({
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }),
        );

        res.locals.token = `Bearer ${createRToken.access_token}`;
        console.log('TOKEN CREADO CON EL CODIGO');
      } else {
        throw new Error('No se recibio codigo de registro');
      }
    }
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error en el middleware SetToken: ', error.message);
    res.status(401).json({ error: 'Error de autenticación', message: error.message });
  }
};

export const MiddlewareAuth0 = {
  SetToken,
  CheckToken,
};
