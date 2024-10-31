/* eslint-disable react/prop-types */
import { useState } from "react";
import { getRoleColor } from "../../helpers/get-role-color";

const users = {
  name: "Eugenea Quevedo",
  role: ['Devops', 'Frontend', 'Backend'],
  avatar: "https://s3-alpha-sig.figma.com/img/2aaf/09de/c80b069b0f6f76a9f44fffc43c81b19d?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1e2kUX8RIJy3IgpgPeVDFgFusxM3aYOiP3DX5WyyuKkq0qzj3oEbqIPMI8M7KNtLgvAs6ObcvqFyQcmQX4GLhP5ja7Uz5lQ-oHODaCl1l43GkiW9~SKddvK0wfhAOj~ZX7vDlmrmM7cTo45iBhNfIkRtM99t~2SIDPBrGjUXGGuXhsGcXuS7ObVDopt2dhq5ENTJV63kreRWq69mhzwYFPMBM9NimFdSm46BYPCglhbfXnkk5TNAezg2ZQB7V1oMi5~o~6r-nHF3edevMXE0SqQWjmEOU2ghL2lStXck12aUvbR-Y8XJwJApOyUGmb7ncRHD6k8tvPEhyFdZ2fCnQ__",
};

export const MessageSidebar = ({
  userList,
  handleUser
}) => {

  return (
    <div className="w-1/4 rounded-l-lg
    border-solid border-r-[1px] border-gray-700
       bg-secondBlack-700">
      {Array.isArray(userList) && userList.map((user, index) => (
        <div
          key={index}
          className={`truncate flex items-center p-2 h-[10vh]
             hover:bg-green-900 hover:opacity-80 hover:rounded-tl-lg hover:cursor-pointer border-solid 
            ${index === 0 ? ' border-b-[1px] border-gray-700' : index === userList.length - 1 ? '' : ''}`}
          onClick={() => handleUser(user.authId)}
        >
          <img
            src={user.avatar || users.avatar}
            alt={user.name}
            className="w-[10%] h-auto rounded-[10px] mr-5"
          />
          <div className="truncate w-[70%]">
            <h2 className="font-medium text-white  text-base md:text-sm lg:text-xl">{user.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
