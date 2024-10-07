import { Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import { User } from "../emtities/userEntity";

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const response = await userRepository.createUser(user);
    res.json(response);
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userRepository.getAllUsers();
    res.json(users);
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userRepository.getUserById(id);
    res.json(user);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const response = await userRepository.updateUser(id, user);
    res.json(response);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await userRepository.deleteUser(id);
    res.json(response);
  }
}

export const userController = new UserController();
