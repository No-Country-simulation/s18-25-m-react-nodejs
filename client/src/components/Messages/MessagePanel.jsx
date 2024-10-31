import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { getRoleColor } from "../../helpers/get-role-color";
import { APIDOMAIN } from '../../../vars';
import userProfileStore from '../../context/users/user-store';
import { BsFillSendFill } from "react-icons/bs";

const socket = io(`${APIDOMAIN}`, {
  withCredentials: true
});

export const MessagePanel = ({ currentUser }) => {
  const { userInstance, fetchUserDetail } = userProfileStore();
  const userRoles = ["front"];
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [actualMessage, setActualMessage] = useState("");

  useEffect(() => {

    if (receiver && currentUser.authId) {
      socket.emit("registerUser", receiver);

      socket.on("initialMessages", (initialMessages) => {
        setMessages(initialMessages);
      });

      socket.on("chatMessage", (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }


    return () => {
      socket.off("initialMessages");
      socket.off("chatMessage");
    };
  }, [receiver]);

  useEffect(() => {

    if (currentUser && currentUser.authId) {
      setReceiver(currentUser.authId);
      fetchUserDetail();

    }
  }, [currentUser, receiver]);

  const handleMessageChange = (event) => {
    setActualMessage(event.target.value);
  };
  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleSendMessage = () => {
    if (receiver && actualMessage) {
      const message = {
        receiverId: receiver,
        content: actualMessage,
        timestamp: new Date(),
      };

      socket.emit("chatMessage", message);
      setMessages(prevMessages => [...prevMessages, message]);
      setActualMessage("");
    }
  };
  const messageEndRef = useRef(null);

  useEffect(() => {
      if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [messages]);
  return (
    <div className="flex flex-col w-2/3 bg-secondBlack-700 
      rounded-r-lg">

      {/* usuario */}
      <div
        className={`truncate flex items-center p-2 h-[10vh]`}
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-[5%] h-auto rounded-[10px] mr-5"
        />
        <div className="truncate w-[70%]">
          <h2 className="font-medium text-white  text-base md:text-sm lg:text-xl">{currentUser.name}</h2>
        </div>
      </div>
      {/* Mostrar mensajes */}
      <div className="mb-4 bg-secondBlack-700 p-4 flex flex-col space-y-4 overflow-y-auto h-96
          border-b-[1px] border-gray-700 rounded-tr-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.receiverId === currentUser.authId ? 'justify-end' : 'justify-start'}`}>
            <div className='flex flex-col'>
              <h3 className={`font-bold text-lg text-white ${msg.receiverId === currentUser.authId ? 'text-right' : 'text-left'}`}>
                {msg.receiverId === currentUser.authId ? userInstance.user.name : currentUser.name}
              </h3>
              <div
                className={`mb-2 p-2 rounded-lg ${msg.receiverId === currentUser.authId ? 'bg-primaryGreen-800 text-right' : 'bg-gray-800 text-left'} inline-block`}
                style={{ backgroundColor: msg.receiverId === currentUser.authId ? '#1D443A' : '#4B5563' }}
              >
                <p className="text-gray-300 mt-2">{msg.content}</p>
              </div>
              <p className={`${msg.receiverId === currentUser.authId ? 'text-right' : 'text-left'}`}>{new Date(msg.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input y botón para enviar mensajes */}
      <div className="mt-auto m-2 flex items-center">
        <input
          type="text"
          className="w-full h-[1vh] p-4 rounded-lg bg-secondBlack-800 text-black outline-none border border-primaryGreen-400"
          value={actualMessage}
          onChange={handleMessageChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage} className="ml-4 p-2 bg-primaryGreen-400 rounded-lg hover:bg-primaryGreen-600">
          <BsFillSendFill
            className='w-[3vh] '
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l9-7-9-7-9 7-9 7z"
          />

        </button>
      </div>
    </div>
  );
};

export default MessagePanel;
