import { Request, Response } from 'express';
import { userRepository } from '../user/userRepository';
import { socialNetworksRepository } from './socialNetworksRepository';

class SocialNetworksController {
  async update(req: Request, res: Response) {
    const { userid } = req.params;
    const { linkedin, github, facebook, instagram, gitlab, twitter } = req.body;

    const updatedSocialNetworks = {
      linkedin,
      github,
      facebook,
      instagram,
      gitlab,
      twitter,
    };

    const user = await userRepository.getUserById(Number(userid));
    const result = await socialNetworksRepository.update(user.social_networks.id, updatedSocialNetworks);
    res.json(result);
  }
}

export const socialNetworkController = new SocialNetworksController();
