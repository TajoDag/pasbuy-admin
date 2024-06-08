import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient";
import DateTimeComponent from "../../../utils/DateTimeComponent";

const ChatBox = (props: any) => {
  const { selectedUser, setSelectedUser } = props;
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  if (isMessagesLoading) {
    return <p>Loading chat ...</p>;
  }

  return (
    <div className="chat-box">
      <div className="chat-header">{selectedUser}</div>
      <div className="messages">
        {messages &&
          messages.map((message: any, index: any) => (
            <div
              key={index}
              className={`message-item ${
                message.senderId === "6663d582b4788233da09fb70"
                  ? "own"
                  : "recipient"
              }`}
            >
              <div className="message-content">{message.text}</div>
              <div className="message-timestamp">
                <DateTimeComponent dateString={message.createdAt} />
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input"
          placeholder="Nhập nội dung..."
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="send-button"
          onClick={() =>
            sendTextMessage(
              message,
              "6663d582b4788233da09fb70",
              currentChat?._id,
              setMessage
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-send"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
