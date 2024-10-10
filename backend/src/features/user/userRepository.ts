import con from '@/config/database';
import { User } from './userEntity';
import { NotFoundError } from '@/utils/errors';

class UserRopository {
  private repository = con.getRepository(User);

  // Crear un usuario
  public async createUser(user: User): Promise<User> {
    const response = await this.repository.save(user);
    console.log(response);

    return response;
  }

  // Obtener todos los usuarios
  public async getAllUsers(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ['social_networks', 'posts'],
    });
    console.log(users);

    return users;
  }

  // Obtener un usuario por id
  public async getUserById(id: User['id']): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['social_networks', 'posts'],
    });

    if (!user) {
      throw new NotFoundError(`user with id ${id} not found`);
    }

    return user;
  }

  // Actualizar un usuario
  public async updateUser(id, user: User): Promise<User> {
    await this.repository.update(id, user);
    return user;
  }

  // Eliminar un usuario
  public async deleteUser(id): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const userRepository = new UserRopository();
