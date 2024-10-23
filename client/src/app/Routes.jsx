import { Route, Routes } from "react-router-dom";
import RedirectLogin from "../components/Auth/Login/RedirectLogin";
import RedirectRegister from "../components/Auth/Register/RedirectRegister";
import AuthModal from "../components/AuthModals/AuthModal";
import { ExplorePage } from "../components/Explore/ExplorePage";
import Profile from '../layout/Profile';
import Notification from "../view/Notificate/Notificate";
import { NotificationBar } from "../components/Notification_bar/NotificationBar";
import SimilarProfilesPage from "../components/Profile/SimilarProfilesPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthModal />} />
      {/* Login */}
      <Route path="/redirect" element={<RedirectRegister />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      <Route path="/redirect/login" element={<RedirectLogin />} />
      {/* perfil */}
      <Route path="/profile/*" element={<Profile />} />
      {/* Paginas generales */}
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/notificationsBar" element={<NotificationBar />} />

      {/* Ruta Perfiles Similares */}
      <Route path="/similares" element={<SimilarProfilesPage/>}/>
    </Routes>
  );
};

export default AllRoutes;
