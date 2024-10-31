import { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardNotification = ({
  url,
  isNew,
  title,
  description,
  type,
  username,
  filter,
}) => {
  const dateNow = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      return `${year}-0${month}-${day}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  };
  const [isNewNotify, setIsNewNotify] = useState(true);

  return (
    <Link
      to={url}
      className={`flex items-center gap-x-4 border-b border-secondBlack-400 px-8 py-4 ${
        isNew === dateNow() && isNewNotify
          ? "bg-primaryGreen-950 text-primaryGreen-400"
          : ""
      }`}
      onClick={() => setIsNewNotify(false)}
    >
      {type === "post" ? (
        <div className="size-[80px] bg-gradient-to-tl from-[#4D235C] to-[#8E43AA] rounded-xl flex items-center justify-center">
          <BsFilePost className="text-white size-6" />
        </div>
      ) : (
        <div className="size-[80px] bg-gradient-to-tl from-[#4356AA] to-[#22255A] rounded-xl flex items-center justify-center">
          <AiOutlineComment className="text-white size-6" />
        </div>
      )}

      <div className=" flex flex-col gap-y-2 w-[80%]">
        <div className="flex items-center w-full justify-between">
          <h3 className=" text-xl font-semibold w-fit">{title}</h3>
          <p className="text-secondBlack-100/30">{isNew}</p>
        </div>
        <p className=" text-xs font-normal">
          <span className="font-semibold text-sm">{username}</span>:{" "}
          {description}
        </p>
      </div>
      {isNew === dateNow() && isNewNotify ? (
        <div className="size-3 bg-primaryGreen-400 rounded-full"></div>
      ) : (
        " "
      )}
    </Link>
  );
};

export default CardNotification;
