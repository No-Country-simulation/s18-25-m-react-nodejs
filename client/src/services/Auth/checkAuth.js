import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const checkAuth = async () => {
  const lastCheck = localStorage.getItem("lastAuthCheck") || "";
  const now = Date.now();
  const SECONDS = 5000;

  if (lastCheck && now - parseInt(lastCheck) < SECONDS) {
      return JSON.parse(localStorage.getItem("userdata") || "false");
  }

  try {
      const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          credentials: 'include',
      });
  
      if (response.ok) {
          const userData = await response.json();
  
          // Guarda los datos en el localStorage y la marca de tiempo actual
          localStorage.setItem("userdata", JSON.stringify(userData));
          localStorage.setItem("lastAuthCheck", now.toString());

          return true;
      } else {
          localStorage.removeItem("userdata");
          localStorage.removeItem("lastAuthCheck");
          return false;
      }
  } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
  }
}

export const logOut = async () => {
    try {
      const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/me?clear=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log('Usuario desloagueado');
        return true;
      } else {
        console.log('No autenticado ' + response);
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
}
  