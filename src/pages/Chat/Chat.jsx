import React from "react";
import "./Chat.css";
import Message from "./components/Message";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", {
  transports: ["websocket"],
});

function Chat() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("Tanya");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const getUserName = (e) => setName(e.target.value);
  const changeUserName = () => setUsername(name);
  const getUserMessage = (e) => setMessage(e.target.value);

  const sendUserMessage = () => {
    const msg = {
      message,
      username,
    };
    setMessages((messages) => [...messages, msg]);
    socket.emit("set-message", msg);
    socket.emit('set-type',msg.username)
  };

  React.useEffect(() => {
    socket.on("get-message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

  }, []);

  return (
    <div className="chat">
      <header>
        <h1>Super Chat</h1>
      </header>

      <section>
        <div id="change_username">
          <input
            id="username"
            type="text"
            name="message"
            onChange={getUserName}
          />
          <button id="send_username" type="button" onClick={changeUserName}>
            Change username
          </button>
        </div>
      </section>

      <section id="chatroom">
        {messages.map((item) => (
          <Message username={item.username} message={item.message} />
        ))}
      </section>
      <section id="input_zone">
        <input
          id="message"
          className="vertical-align"
          type="text"
          onChange={getUserMessage}
        />
        <button
          id="send_message"
          className="vertical-align"
          type="button"
          onClick={sendUserMessage}
        >
          Send
        </button>
      </section>
    </div>
  );
}

export default Chat;
