import React, { useState, useEffect, useRef } from "react";

const ChatWindow = ({ user, avatar, messages, addMessage }) => {
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [comment, setComment] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const timeSent = getCurrentTimeString();
      addMessage(user, { type: "text", content: input.trim() }, timeSent);
      setInput("");
    }
  };
  const handleImageUpload = () => {
    if (imageUrl.trim() !== "") {
      const timeSent = getCurrentTimeString();
      addMessage(
        user,
        { type: "image", content: imageUrl.trim(), comment: comment.trim() },
        timeSent
      );
      setImageUrl("");
      setComment("");
      setShowPopup(false);
    }
  };
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="chat__obj">
      <div className="profile">
        <img src={avatar} className="pic" alt={`${user}'s avatar`} />
        <div className="profile__data">
          <h2 className="name">{user}</h2>
          <h3 className="status">Online</h3>
        </div>
      </div>
      <div className="message__box" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div className="info" key={index}>
            <div
              className="mes__box"
              style={{
                margin: msg.user === user ? "0 0 0 auto" : "auto 0 0 0",
                background: msg.user === user ? "#D0DCFF" : "#C4BFFF",
                borderRadius:
                  msg.user === user ? "10px 10px 0 10px" : "10px 10px 10px 0",
                textAlign: msg.user === user ? "left" : "right",
              }}
            >
              {msg.content.type === "image" ? (
                <>
                  <img
                    className="img"
                    src={msg.content.content}
                    alt="User sent"
                  />
                  <p>{msg.content.comment}</p>
                </>
              ) : (
                msg.content.content
              )}
            </div>
            <div
              className="time"
              style={{
                margin: msg.user === user ? "0 0 0 auto" : "auto 0 0 0",
                textAlign: msg.user === user ? "right" : "left",
              }}
            >
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="send__box">
        <input
          className="input"
          placeholder="Type..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="btn"
          onClick={input.trim() ? handleSendMessage : () => setShowPopup(true)}
        >
          {input.trim() === "" ? (
            <i className="fas fa-camera-alt"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup__content">
            <h3>Upload Image</h3>
            <input
              className="img__url"
              type="text"
              placeholder="URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              className="img__comment"
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="popup__buttons">
              <button className="cancel" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="send" onClick={handleImageUpload}>
                Send
              </button>
            </div>
          </div>
          <div className="popup__overlay" onClick={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
