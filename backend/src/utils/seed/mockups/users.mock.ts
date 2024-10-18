import { User } from '@/features/user/userEntity';

type UserMock = Pick<User, 'name' | 'email' | 'role' | 'location' | 'job'> & {
  social_networks: { [k: string]: string };
};

export const USERS_MOCK: UserMock[] = [
  {
    email: 'martin@gmail.com',
    name: 'martin',
    job: 'Diseñador Freelance',
    role: 'ux/ui',
    location: 'Buenos Aires',
    social_networks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    email: 'ezequiel@gmail.com',
    name: 'ezequiel',
    job: 'Consultora',
    role: 'Desarrollador Backend',
    location: 'Buenos Aires',
    social_networks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    email: 'email@gmail.com',
    name: 'username',
    job: 'Mercado libre',
    role: 'Ingeniero devops',
    location: 'Buenos Aires',
    social_networks: {
      facebook: 'https://facebook.com',
      github: 'https://github.com',
      gitlab: 'https://gitlbab.com',
    },
  },
];
