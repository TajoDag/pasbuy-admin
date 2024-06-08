import React, { useState } from "react";

type Props = {};

const users = [
  "HOAI",
  "ĐÀO THỊ HOÀI KHANH",
  "hung1989",
  "Văn hưng",
  "hoanghai",
  "hải",
  "NgocKhanh2801",
  "Maianh",
  "hai",
  "Le bình",
  "Thắng anh",
];

const messages = [
  {
    sender: "HOAI",
    content: "Tôi muốn liên kết tài khoản",
    timestamp: "06/06 19:14",
  },
  {
    sender: "Admin",
    content:
      "Bạn vui lòng chờ đợi trong giây lát. Để chúng tôi kiểm tra hệ thống hỗ trợ bạn.",
    timestamp: "06/06 19:14",
  },
  {
    sender: "HOAI",
    content: "tôi liên kết tài khoản",
    timestamp: "07/07 11:07",
  },
  {
    sender: "Admin",
    content:
      "Ngân hàng: ACB – NH TMCP Á CHÂU\nTên : CAO THI N\nSố Tài Khoản: 319073197",
    timestamp: "07/07 11:09",
  },
];

const Chats = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="chat-container">
      <div className="user-list">
        <input className="search-input" placeholder="Tìm kiếm người dùng..." />
        {users.map((user, index) => (
          <div
            key={index}
            className={`user-item ${selectedUser === user ? "selected" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </div>
        ))}
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">{selectedUser}</div>
            <div className="messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-item ${
                    message.sender === "Admin" ? "admin" : ""
                  }`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input className="chat-input" placeholder="Nhập nội dung..." />
              <button className="send-button">Gửi</button>
            </div>
          </>
        ) : (
          <div className="empty-state">Chưa có đoạn hội thoại nào</div>
        )}
      </div>
    </div>
  );
};

export default Chats;
