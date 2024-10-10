import con from '@/config/database';
import { SocialNetworks } from './socialNetworksEntity';

type SocialNetworksUpdate = Omit<SocialNetworks, 'id'>;

class SocialNetworksRepository {
  private repository = con.getRepository(SocialNetworks);

  async create(payload: SocialNetworks) {
    await this.repository.save(payload);
  }

  async delete(id: SocialNetworks['id']) {
    await this.repository.delete({ id });
  }

  async update(id: SocialNetworks['id'], payload: SocialNetworksUpdate) {
    await this.repository.update({ id }, payload);
  }
}

export const socialNetworksRepository = new SocialNetworksRepository();
