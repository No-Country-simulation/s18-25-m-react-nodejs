import auth0 from 'auth0-js';

import {
  DOMAIN,
  CLIENT_ID,
  CLIENT_DOMAIN,
} from '../../../../vars';
import { logOut } from '../../../services/Auth/checkAuth';

const handleLogout = async () => {
  localStorage.clear();
  await logOut();
  const webAuth = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
  });

  webAuth.logout({
    returnTo: CLIENT_DOMAIN,
    clientID: CLIENT_ID,
  });

};

export default handleLogout;
