import { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import userProfileStore from "../../context/users/user-store";
import { checkAuth } from "../../services/Auth/checkAuth";
import LoginModal from "../Auth/Login/LoginModal";
import RegisterModal from "../Auth/Register/RegisterModal";
import DropNav from "./DropNav";

const listNav = [
  {
    icon: "home",
    name: "Inicio",
    url: "/",
  },
  {
    icon: "explore",
    name: "Explorar",
    url: "/explore",
  },
];
const authNavList = [
  {
    icon: "notification",
    name: "Notificaciones",
    url: "/notifications",
  },
  {
    icon: "message",
    name: "Mensajes",
    url: "/messages",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { loading, userInstance } = userProfileStore();
  const [isIndex, setIsIndex] = useState(null);
  const [isActiveDrop, setIsActiveDrop] = useState(false);
  //const [userlogin, setUserLogin] = useState(localStorage.getItem("userdata"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  useEffect(() => {

    const checkUserAuth = async () => {
      if (!loading) {
        const auth = await checkAuth();
        setIsAuthenticated(auth);
      }
    };

    checkUserAuth();
  }, [loading]);

  useEffect(() => {
    setIsIndex(isIndex);
  }, [pathname]);

  /*  useEffect(() => {
     setUserLogin(localStorage.getItem("userdata"));
   }, [localStorage.getItem("userdata")]); */

  return (
    <header className="w-full h-[90px] bg-secondBlack-700 text-white relative">
      <nav className="max-w-[1210px] w-full h-full mx-auto flex items-center justify-between relative">
        <Link
          to={"/"}
          onClick={() => setIsIndex(0)}
          className="text-xl font-semibold tracking-widest"
        >
          <span className="text-primaryGreen-400">Tech</span>Social
        </Link>
        {/* Lista de navegacion */}
        <section className=" flex items-center h-full gap-x-10">
          <ul className={`flex items-center gap-x-8 relative h-full`}>
            {isAuthenticated
              ? [...listNav, ...authNavList].map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className={`relative flex items-center gap-x-1 z-10 transition-all duration-100 ${
                      isIndex === index ? "text-primaryGreen-400" : ""
                    }`}
                    onClick={() => setIsIndex(index)}
                  >
                    {item.icon === "home" ? (
                      <BsHouse className="size-6" />
                    ) : item.icon === "explore" ? (
                      <MdOutlineTravelExplore className="size-6" />
                    ) : item.icon === "notification" ? (
                      <IoMdNotificationsOutline className="size-6" />
                    ) : item.icon === "message" ? (
                      <AiOutlineMail className="size-6" />
                    ) : (
                      ""
                    )}
                    <span className="text-lg font-normal">{item.name}</span>
                    {(item.icon === "notification" ||
                      item.icon === "message") && (
                      <span className="absolute -right-2 -top-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGreen-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryGreen-400"></span>
                      </span>
                    )}
                  </Link>
                ))
              : listNav.map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className={`relative flex items-center gap-x-1 z-10 transition-all duration-100 ${
                      isIndex === index ? "text-primaryGreen-400" : ""
                    }`}
                    onClick={() => setIsIndex(index)}
                  >
                    {item.icon === "home" ? (
                      <BsHouse className="size-6" />
                    ) : item.icon === "explore" ? (
                      <MdOutlineTravelExplore className="size-6" />
                    ) : item.icon === "notification" ? (
                      <IoMdNotificationsOutline className="size-6" />
                    ) : item.icon === "message" ? (
                      <AiOutlineMail className="size-6" />
                    ) : (
                      ""
                    )}
                    <span className="text-lg font-normal">{item.name}</span>
                    {(item.icon === "notification" ||
                      item.icon === "message") && (
                      <span className="absolute -right-2 -top-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGreen-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryGreen-400"></span>
                      </span>
                    )}
                  </Link>
                ))}
            <div
              className={`absolute transition-all duration-300 ${
                pathname === "/"
                  ? "w-28 -left-4"
                  : pathname === "/explore"
                    ? "w-28 left-24"
                    : pathname === "/notifications"
                      ? "w-40 left-56"
                      : pathname === "/messages"
                        ? "w-32 left-[395px]"
                        : ""
              } h-full bg-primaryGreen-950`}
            ></div>
          </ul>
          {isAuthenticated ? (
            <button
              to="/profile"
              className=" size-[55px] rounded-xl overflow-hidden"
              onClick={() => setIsActiveDrop(!isActiveDrop)}
            >
              <img
                src={userInstance.user.avatar || "/images/image-useroerfil.png"}
                className="size-full object-cover"
                alt="imagen-perfilDeUsuario"
              />
            </button>
          ) : (
            <button
              className="text-white bg-secondBlack-900 flex items-center justify-center rounded-lg size-[55px]"
              onClick={() => setIsActiveDrop(!isActiveDrop)}
            >
              <AiOutlineUser className="size-7" />
            </button>
          )}
        </section>
        <DropNav
          setIsIndex={setIsIndex}
          setIsActiveDrop={setIsActiveDrop}
          isActiveDrop={isActiveDrop}
          userlogin={isAuthenticated}
          setIsModalOpenRegister={setIsModalOpenRegister}
          setIsModalOpenLogin={setIsModalOpenLogin}
        />
      </nav>
      {isModalOpenRegister && (
        <RegisterModal onClose={() => setIsModalOpenRegister(false)} />
      )}
      {isModalOpenLogin && (
        <LoginModal onClose={() => setIsModalOpenLogin(false)} />
      )}
    </header>
  );
};

export default Navbar;
