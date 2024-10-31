import { useEffect, useState } from "react";
import LayouteMain from "../layout/LayouteMain";
import CardNotification from "../components/Notifications/CardNotification";
import { AiOutlineHeart } from "react-icons/ai";
import { getRoleColor } from "../helpers/get-role-color";
import { useSimilarProfile } from "../context/SimilarProfiles/getSimilarProfeiles";
import similarsUserStore from "../context/users/similars_user_store";

const listSimilarProfile = [
  {
    id: 1,
    image: "",
    name: "Carlitos Garris",
    rols: ["Software Developer", "DevOps Engineer"],
  },
  {
    id: 2,
    image: "",
    name: "Marcos Martinez",
    rols: ["Software Developer", "QA Engineer"],
  },
  {
    id: 3,
    image: "",
    name: "Angela Leiva",
    rols: ["Software Developer", "UI/UX Designer"],
  },
  {
    id: 4,
    image: "",
    name: "Eugenea Quevedo",
    rols: ["Business Analyst"],
  },
];

const SimilarProfile = () => {
  /* const [listSimilarProfile, setListSimilarProfile] =
    useState(listSimilarProfile); */
  const [isPage, setIspage] = useState(0);
  const { similarUsers, page, loading, error, fetchUsers, reset } =
    similarsUserStore();
  const { user } = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    /* getSimilarProfile(); */
    const fetchUserData = async () => {
      //setIsLoading(true);
      await fetchUsers(isPage);
      //setIsLoading(false);
    };
    fetchUserData();
    return () => {
      reset();
    };
  }, [fetchUsers, isPage]);

  return (
    <LayouteMain>
      <section className=" max-w-[688px] w-full h-fit flex flex-col gap-y-5">
        {loading ? (
          <article className=" h-full rounded-xl overflow-hidden">
            <ul className="flex flex-col h-fit animate-pulse">
              <li className=" bg-secondBlack-400 w-full h-24 border-b border-neutral-600 px-8 py-4 flex flex-col justify-between">
                <div className=" w-36 bg-neutral-600 h-4 rounded-full"></div>
                <div className="flex flex-col gap-y-1">
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                </div>
              </li>
              <li className=" bg-secondBlack-400 w-full h-24 border-b border-neutral-600 px-8 py-4 flex flex-col justify-between">
                <div className=" w-36 bg-neutral-600 h-4 rounded-full"></div>
                <div className="flex flex-col gap-y-1">
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                </div>
              </li>
              <li className=" bg-secondBlack-400 w-full h-24 border-b border-neutral-600 px-8 py-4 flex flex-col justify-between">
                <div className=" w-36 bg-neutral-600 h-4 rounded-full"></div>
                <div className="flex flex-col gap-y-1">
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                </div>
              </li>
              <li className=" bg-secondBlack-400 w-full h-24 border-b border-neutral-600 px-8 py-4 flex flex-col justify-between">
                <div className=" w-36 bg-neutral-600 h-4 rounded-full"></div>
                <div className="flex flex-col gap-y-1">
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                </div>
              </li>
              <li className=" bg-secondBlack-400 w-full h-24 border-b border-neutral-600 px-8 py-4 flex flex-col justify-between">
                <div className=" w-36 bg-neutral-600 h-4 rounded-full"></div>
                <div className="flex flex-col gap-y-1">
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                  <div className=" w-full rounded-full h-2 bg-neutral-600"></div>
                </div>
              </li>
            </ul>
          </article>
        ) : (
          <article className="bg-secondBlack-700 w-full h-full rounded-xl overflow-hidden">
            <ul className="flex flex-col h-fit">
              {similarUsers ? (
                similarUsers
                  .filter((item) => item.authId !== user.authId)
                  ?.map((item) => (
                    <li
                      className="flex items-center justify-between w-full px-8 py-4 border-b border-secondBlack-400"
                      key={item.id}
                    >
                      <section className="flex gap-x-4">
                        <div className="size-[70px] rounded-xl overflow-hidden">
                          {item.avatar ? (
                            <img
                              className="size-full object-cover"
                              src={item.avatar}
                              alt={`Imagen-perfil-${item.name}`}
                            />
                          ) : (
                            <div className="size-full bg-secondBlack-400 text-secondBlack-100 flex items-center justify-center">
                              70 x 70
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <h3 className="text-xl font-semibold">{item.name}</h3>
                          <ul className="flex items-center gap-x-2 ">
                            {item.roles.map((item) => (
                              <li
                                className={`px-2 py-1 rounded-md text-sm`}
                                style={{
                                  backgroundColor: `${getRoleColor(item)}`,
                                  borderLeft: `4px solid rgba(255,255,255,0.25)`,
                                }}
                              >
                                {item}{" "}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                      <button className="size-7 rounded-md border p-1 flex items-center justify-center border-primaryGreen-400 text-primaryGreen-400 hover:bg-primaryGreen-400 hover:text-white ">
                        <AiOutlineHeart />
                      </button>
                    </li>
                  ))
              ) : (
                <div className="text-white text-2xl">No hay Perfiles</div>
              )}
            </ul>
          </article>
        )}
      </section>
    </LayouteMain>
  );
};
export default SimilarProfile;
