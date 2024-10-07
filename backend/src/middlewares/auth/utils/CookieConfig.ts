import { CookieOptions } from "express";

export const CookieConfig = (config?: CookieOptions): CookieOptions => {
    return {
        httpOnly: config?.httpOnly ?? true,
        maxAge: config?.maxAge ?? 3 * 24 * 60 * 60 * 1000,
        sameSite: config?.sameSite ?? "none",
        secure: config?.secure ?? false 
    }
}