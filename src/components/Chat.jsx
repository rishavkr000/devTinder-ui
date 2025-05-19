import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socketio";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const scrollRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true})
      console.log(chat.data.messages)

      const chatMessage = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId.firstName,
          lastName: msg?.senderId.lastName,
          text: msg?.text
        }
      })
      setMessages(chatMessage)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChatMessages();
  }, [])

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and join chat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  // scroll helper
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // run after first fetch
  useEffect(() => {
    fetchChatMessages().then(scrollToBottom);
  }, []);

  // run whenever a new message is pushed
  useEffect(scrollToBottom, [messages]);


  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div ref={scrollRef} className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
              </div>
              <div className="chat-bubble">{msg.text}</div>
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
