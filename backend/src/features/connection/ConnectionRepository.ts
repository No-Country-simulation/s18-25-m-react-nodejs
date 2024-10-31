import con from '@/config/database';
import { PaginatedConfig } from '@/types/PaginatedConfig.type';
import { NotFoundError } from '@/utils/errors';
import { Like } from 'typeorm';
import { User } from '../user/userEntity';
import { Connection } from './ConnectionEntity';
import { userRepository } from '../user/userRepository';

type ConnectionPaginatedConfig = PaginatedConfig & {
  userid: User['id'];
  authId?: string;
};

class ConnectionRepository {
  private repository = con.getRepository(Connection);

  async setConnection(authId: string, authIdFollowed: string) {
    try {
      const followedUser = await userRepository.getUserByAuthId(authIdFollowed);
      const followerUser = await userRepository.getUserByAuthId(authId);

      const connExist = await this.isFollower(followedUser.id, followerUser.id);

      if (connExist) return Error('La coneccion ya existe');

      const conn = new Connection();

      conn.followed = followedUser;
      conn.follower = followerUser;
      conn.timestamp = new Date();

      return await this.repository.save(conn);
    } catch (error) {
      throw new Error('Error al seguir al usuario : ' + error);
    }
  }
  // Usuarios que siguen al usuario cliente
  async getAllFollowers({ limit, userid, search, skip }: ConnectionPaginatedConfig) {
    const results = await this.repository.find({
      where: {
        followed: { id: userid },
        follower: {
          name: Like(`%${search}%`),
        },
      },
      relations: ['follower'],
      take: limit,
      skip,
    });

    return results.map((res) => res.follower);
  }

  // Usuarios al que el usuario sigue
  async getAllFollowed({ limit, userid, search, skip }: ConnectionPaginatedConfig) {
    const results = await this.repository.find({
      where: {
        follower: { id: userid },
        followed: { name: Like(`%${search}%`) },
      },
      relations: ['followed', 'followed.roles'],
      take: limit,
      skip,
    });

    return results.map((res) => ({
      id: res.followed.id,
      name: res.followed.name,
      authId: res.followed.authId,
      avatar: res.followed.avatar,
      roles: res.followed.roles,
    }));
  }

  async getFollowersCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      where: {
        followed: { id: userid },
        follower: {
          name: Like(`%${search}%`),
        },
      },
    });

    return count;
  }

  async getFollowedCount({ search, userid }: ConnectionPaginatedConfig): Promise<number> {
    const count = await this.repository.count({
      relations: ['followed', 'followed.roles'],
      where: {
        followed: {
          name: Like(`%${search}%`),
        },
        follower: { id: userid },
      },
    });
    return count;
  }

  async getFollowedConnection(followedid: User['id'], clientUser: User['email']): Promise<Connection> {
    const result = await this.repository.findOne({
      where: {
        followed: {
          id: followedid,
        },
        follower: {
          email: clientUser,
        },
      },
    });

    if (!result) {
      throw new NotFoundError('Connection not found');
    }

    return result;
  }

  async deleteConnection(id: Connection['id']) {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }

  async isFollower(followedid: User['id'], followerid: User['id']) {
    const result = await this.repository.count({
      where: {
        followed: { id: followedid },
        follower: { id: followerid },
      },
    });
    return result === 1;
  }

  async createConnection(followedid: User['id'], followerid: User['id']) {
    const connection = this.repository.create({
      followed: { id: followedid },
      follower: { id: followerid },
    });

    await this.repository.save(connection);
    return connection;
  }
}

export const connectionRepository = new ConnectionRepository();
