import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./App.css";
import "./all.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const addMessage = (user, message, time) => {
    setMessages([...messages, { user, content: message, time }]);
  };

  return (
    <div className="chat__box">
      <ChatWindow
        user="Alex"
        avatar="/2.png"
        messages={messages}
        addMessage={addMessage}
      />
      <ChatWindow
        user="Pam"
        avatar="/1.png"
        messages={messages}
        addMessage={addMessage}
      />
    </div>
  );
};

export default App;
