import con from '@/config/database';
import { UserDataToken } from '@/middlewares/Auth/interface/UserDataToken';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { Role } from '../role/roleEntity';
import { User } from './userEntity';

type UserPut = Pick<User, 'avatar' | 'location' | 'name' | 'job'> & { role: [string] };

type UserFilters = {
  role?: string;
};

class UserRopository {
  private repository = con.getRepository(User);
  private repositoryRoles = con.getRepository(Role);

  public async createUser(user: Partial<UserDataToken>): Promise<User> {
    const userExist = await this.repository.findOne({
      where: {
        authId: user.authId,
      },
    });

    if (userExist) throw Error('El usuario existe');

    const response = await this.repository.save({
      authId: user.authId,
      authName: user.authName,
      email: user.email,
      name: user.authName,
    });
    return response;
  }

  public async getAllUsersCount({ search }: PaginatedConfig & UserFilters): Promise<number> {
    return await this.repository.count({
      where: {
        name: Like(`%${search}%`),
      },
    });
  }

  public async getAllUsers({ limit, search, skip }: PaginatedConfig & UserFilters) {

    const users = await this.repository.find({
      relations: ['social_networks', 'roles'],
      where: {
        name: Like(`%${search}%`),
      },
      take: limit,
      skip,
    });

    // Remove id from role object
    return users.map((user) => ({
      ...user,
      roles: user.roles.map((r) => r.name),
    }));
  }

  public async getUserById(id: User['id']) {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['social_networks', 'posts', 'roles'],
    });

    if (!user) {
      throw new NotFoundError(`user with id ${id} not found`);
    }

    // Remove id from role object
    return { ...user, roles: user.roles.map((r) => r.name) };
  }

  public async getUserByEmail(email: User['email']): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['social_networks'],
    });

    if (!user) {
      throw new NotFoundError(`user with email ${email} not found`);
    }

    return user;
  }

  public async getUserByAuthId(authId: User['authId']): Promise<User> {
    
    const user = await this.repository.findOne({
      where: { authId },
      relations: ['social_networks', 'roles'],
    });

    if (!user) {
      throw new NotFoundError(`user not found`);
    }

    return user;
  }

  public async updateUser(authId: User['authId'], user: UserPut): Promise<User> {
    console.log('Updating user data:', user);

    const roles = await Promise.all(
      user.role.map(async (roleName) => {
        const role = await this.repositoryRoles.findOne({ where: { name: roleName } });
        if (!role) throw new Error(`Role ${roleName} not found`);
        return role;
      }),
    );

    const userToUpdate = await this.repository.findOne({ where: { authId }, relations: ['roles'] });
    if (!userToUpdate) throw new Error('User not found');

    userToUpdate.roles = roles;

    userToUpdate.avatar = user.avatar;
    userToUpdate.job = user.job;
    userToUpdate.location = user.location;
    userToUpdate.name = user.name;

    await this.repository.save(userToUpdate);

    return userToUpdate;
  }

  public async deleteUser(id: User['id']): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  public async getAllUsersByRole(role: Role['name']) {
    const users = await this.repository.find({
      where: {
        roles: { name: Like(`${role}`) },
      },
      relations: ['roles'],
    });

    // Remove id from role object
    return users.map((user) => ({
      ...user,
      roles: user.roles.map((r) => r.name),
    }));
  }

  public async getUserWithRoles(id: User['id']) {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['roles'],
    });
    return { ...user, roles: user?.roles.map((r) => r.name) };
  }
}

export const userRepository = new UserRopository();
