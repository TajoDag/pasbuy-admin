import React, { useContext, useState } from "react";

import { ChatContext } from "../../context/ChatContext";
import UserChat from "./components/UserChat";
import ChatBox from "./components/ChatBox";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

type Props = {};

const Chats = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const {
    userChats,
    isUserChatsLoading,
    updateCurrentChat,
    currentChat,
    onlineUsers,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(
    currentChat,
    "6663d582b4788233da09fb70"
  );
  return (
    <div className="chat-container">
      <div className="user-list">
        <input className="search-input" placeholder="Tìm kiếm người dùng..." />
        {userChats && userChats?.length < 1 ? null : (
          <div>
            {isUserChatsLoading && <p>Loading......</p>}
            {userChats?.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserChat
                  chat={chat}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  onlineUsers={onlineUsers}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <ChatBox
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <div className="empty-state">No conversation selected yet...</div>
        )}
      </div>
    </div>
  );
};

export default Chats;
