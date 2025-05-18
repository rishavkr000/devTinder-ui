import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socketio";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and join chat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };


  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-4">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 font-bold rounded p-2 bg-gray-500"
        />
        <button onClick={sendMessage} className="btn btn-primary ml-auto">
          {" "}
          Send{" "}
        </button>
      </div>
    </div>
  );
};

export default Chat;
