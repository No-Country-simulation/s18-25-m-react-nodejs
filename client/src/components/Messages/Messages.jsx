import { useEffect, useState } from "react";
import userFollowersStore from "../../context/users/followers-store";
import { MessagePanel } from "./MessagePanel";
import { MessageSidebar } from "./MessageSidebar";

export function Messages() {
  const { getFollowers, getFolloweds, follower, followed } = userFollowersStore();
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchUserData = async () => {
      setIsLoading(true);
      await getFollowers();
      await getFolloweds();
      setIsLoading(false);
    };
    fetchUserData();

  }, []);

  const handleSelectUser = (userId) => {

    const user = followed.list.find((user) => user.authId === userId);

    setCurrentUser(user);

  }
  return (
    <section className="flex flex-col
    my-[5vh] mx-[10vh] text-white">
      <div className="flex flex-row rounded-lg">
        <MessageSidebar userList={followed.list || []} handleUser={handleSelectUser} />

        {!isLoading && currentUser ?
          <MessagePanel currentUser={currentUser} /> :
          <div className="w-fit flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Chatea con tus futuros colegas</h1>
            <p className="text-lg md:text-xl text-gray-300">Aquí puedes interactuar y hacer conexiones con otros desarrolladores.</p>
          </div>
        }
      </div>


    </section>
  );

}

export default Messages;
