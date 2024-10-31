import { useEffect, useRef, useCallback } from "react";
import userFollowersStore from "../../context/users/followers-store";
import { getRoleColor } from "../../helpers/get-role-color";
import { UserTypes } from "../../utils/UserListType";

const UserList = ({ type }) => {
  const { followed, follower, loading, getFolloweds, getFollowers } =
    userFollowersStore();
  const users = type === UserTypes.FOLLOWED ? followed : follower;
  const observer = useRef();

  const lastUserElementRef = useCallback(
    (node) => {
      if (loading || !users.has_more) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = users.page + 1;
          if (type === UserTypes.FOLLOWED) {
            getFolloweds(nextPage);
          } else if (type === UserTypes.FOLLOWERS) {
            getFollowers(nextPage);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [getFolloweds, getFollowers]
  );

  useEffect(() => {
    if (type === UserTypes.FOLLOWED) {
      getFolloweds();
    } else if (type === UserTypes.FOLLOWERS) {
      getFollowers();
    }
  }, [getFolloweds, getFollowers, type]);

  const desiredColumns = 4;
  const ghostDivCount =
    Math.ceil(users.list.length / desiredColumns) * desiredColumns -
    users.list.length;

  return (
    <ul className="flex flex-wrap justify-start gap-3 w-full py-5">
      {Array.isArray(users.list) &&
        users.list.map((userData, index) => {
          const isLastUser = index === users.list.length - 1;

          return (
            <li
              ref={isLastUser ? lastUserElementRef : null}
              key={index}
              className="flex gap-x-2 bg-secondBlack-700 rounded-xl w-full max-w-[230px] p-3 h-fit "
            >
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-16 h-16 object-cover rounded-lg mb-2"
              />
              <section className="flex flex-col gap-y-1">
                <h2 className="text-base font-normal text-white ">{userData.name}</h2>
                <ul className="flex gap-2 flex-wrap">
                  {Array.isArray(userData?.roles) &&
                  userData.roles.length > 0 ? (
                    userData.roles.map((role, index) => (
                      <li
                        key={index}
                        className="text-[12px] text-white px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize truncate"
                        style={{ backgroundColor: getRoleColor(role.name) }}
                      >
                        {role.name}
                      </li>
                    ))
                  ) : (
                    <li>No roles available</li>
                  )}
                </ul>
              </section>
            </li>
          );
        })}

      {/* Ghost Divs */}
      {Array.from({ length: ghostDivCount }).map((_, index) => (
        <div
          key={`ghost-${index}`}
          className="min-w-[200px] max-w-[400px] min-h-[76px] flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 invisible"
        />
      ))}

      {loading && <p className="text-center">Cargando...</p>}
    </ul>
  );
};

export default UserList;
