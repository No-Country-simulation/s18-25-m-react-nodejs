import { UserDataToken } from "../../../middlewares/auth/interface/UserDataToken";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const CreateUserAuthC = (req: Request, res: Response): void => {
  console.log("Creando el usuario desde Auth0");

  try {
    const userData: UserDataToken = res.locals["userData"];
    console.log("USER DATA: " + JSON.stringify(userData));

    if (!userData) {
      throw new Error("No se encontró información del usuario");
    }

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userData,
    });
  } catch (error: any) {
    console.error("Error al crear el usuario: ", error.message);
    res.status(500).json({
      error: "Error al crear el usuario",
      message: error.message || "Error desconocido",
    });
  }
};

export const authUserController = {
  CreateUserAuthC,
};
