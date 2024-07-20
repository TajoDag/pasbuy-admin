// import React, { useContext } from "react";
// import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient";
// import avt from "../../../assets/images/6596121.png";
// import { FiMessageSquare, FiClock } from "react-icons/fi";
// import { unreadNotificationFunc } from "../../../utils/unreadNotifications";
// import { ChatContext } from "../../../context/ChatContext";
// import { useFetchLatestMessage } from "../../../hooks/useFetchLatestMessage";
// import DateTimeComponent from "../../../utils/DateTimeComponent";

// const UserChat = (props: any) => {
//   const { chat, selectedUser, setSelectedUser, onlineUsers } = props;
//   const { notifications, markThisUserNotificationsAsRead, setIsChatOpen } =
//     useContext(ChatContext);

//   const { latestMessage } = useFetchLatestMessage(chat);
//   const { recipientUser } = useFetchRecipientUser(
//     chat,
//     "6663d582b4788233da09fb70"
//   );

//   const unreadNotifications = unreadNotificationFunc(notifications);
//   const thisUserNotifications = unreadNotifications?.filter(
//     (n: any) => n.senderId === recipientUser?._id
//   );

//   const handleUserItemClick = () => {
//     if (thisUserNotifications?.length !== 0) {
//       markThisUserNotificationsAsRead(thisUserNotifications, notifications);
//     }
//     setSelectedUser(recipientUser?.username);
//     setIsChatOpen(false); // Mark chat as closed when user item is clicked
//   };

//   return (
//     <div
//       className={`user-item ${
//         selectedUser === recipientUser?.username ? "selected" : ""
//       }`}
//       onClick={handleUserItemClick}
//     >
//       <img src={avt} alt={recipientUser?.username} />
//       <div className="user-info">
//         <div className="user-name">{recipientUser?.username}</div>
//         {thisUserNotifications?.length > 0 ? (
//           <div className="last-message">
//             <FiMessageSquare size={10} /> New
//           </div>
//         ) : null}
//       </div>
//       <div className="chat-meta">
//         <div className="online-status">
//           <span
//             className={`online-dot ${
//               onlineUsers?.some(
//                 (user: any) => user?.userId === recipientUser?._id
//               )
//                 ? "online"
//                 : "offline"
//             }`}
//           />
//         </div>
//         <div className="timestamp">
//           <FiClock size={12} />{" "}
//           <DateTimeComponent dateString={latestMessage?.createdAt} />
//         </div>
//         <div
//           className={thisUserNotifications?.length > 0 ? "unread-count" : ""}
//         >
//           {thisUserNotifications?.length > 0
//             ? thisUserNotifications?.length
//             : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserChat;
import React, { useContext, useEffect, useState } from "react";
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient";
import avt from "../../../assets/images/6596121.png";
import { FiMessageSquare, FiClock } from "react-icons/fi";
import { unreadNotificationFunc } from "../../../utils/unreadNotifications";
import { ChatContext } from "../../../context/ChatContext";
import { useFetchLatestMessage } from "../../../hooks/useFetchLatestMessage";
import DateTimeComponent from "../../../utils/DateTimeComponent";
import TranslateTing from "../../../components/Common/TranslateTing";
import { detailChat, readChat } from "../../../api/utils/chat";

const UserChat = (props: any) => {
  const {   chat,
    onSelectChat,
    selectedUser,
    setSelectedUser,
    onlineUsers, } = props;
  const { notifications, markThisUserNotificationsAsRead, setIsChatOpen } =
    useContext(ChatContext);

    const { latestMessage } = useFetchLatestMessage(chat);
  const { recipientUser } = useFetchRecipientUser(
    chat,
    "6663d582b4788233da09fb70"
  );

  const [isReadReload, setIsReadReload] = useState<boolean>(true);

  const unreadNotifications = unreadNotificationFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n: any) => n.senderId === recipientUser?._id
  );
  if (!recipientUser) {
    // Không hiển thị tài khoản bị xóa hoặc gặp lỗi
    return null;
  }
  useEffect(() => {
    if (chat._id) {
      const getChat = async () => {
        try {
          const rp = await detailChat(chat._id);
          setIsReadReload(rp.result.isRead);
        } catch (e) {}
      };
      getChat();
    }
  }, [chat._id]);

  const handleUserItemClick = async () => {
    if (thisUserNotifications?.length !== 0) {
      markThisUserNotificationsAsRead(thisUserNotifications, notifications);
    }
    setSelectedUser(recipientUser?.username);
    setIsChatOpen(false); // Mark chat as closed when user item is clicked

    try {
      const rp = await readChat(chat._id);
      if (rp.status) {
        setIsReadReload(true);
      }
    } catch (e) {
      console.error("Failed to mark chat as read:", e);
    }
  };

  if (!recipientUser) {
    // Không hiển thị tài khoản bị xóa hoặc gặp lỗi
    return null;
  }

  // const handleUserItemClick = () => {
  //   if (thisUserNotifications?.length !== 0) {
  //     markThisUserNotificationsAsRead(thisUserNotifications, notifications);
  //   }
  //   setSelectedUser(recipientUser?.username);
  //   setIsChatOpen(false); // Mark chat as closed when user item is clicked
  // };

  return (
    <div
      className={`user-item ${
        selectedUser === recipientUser._id ? "selected" : ""
      }`}
      onClick={handleUserItemClick}
    >
      <img src={avt} alt={recipientUser?.username} />
      <div className="user-info">
        <div className="user-name">
          {recipientUser?.username && recipientUser?.username ? (
            recipientUser?.username
          ) : (
            <TranslateTing text="Account has been deleted" />
          )}
        </div>
        {thisUserNotifications?.length > 0 || !isReadReload ? (
          <div className="last-message">
            <FiMessageSquare size={10} /> New
          </div>
        ) : null}
      </div>
      <div className="chat-meta">
        <div className="online-status">
          <span
            className={`online-dot ${
              onlineUsers?.some(
                (user: any) => user?.userId === recipientUser?._id
              )
                ? "online"
                : "offline"
            }`}
          />
        </div>
        <div className="timestamp">
          <FiClock size={12} />{" "}
          <DateTimeComponent dateString={latestMessage?.createdAt} />
        </div>
        <div
          className={thisUserNotifications?.length > 0 ? "unread-count" : ""}
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
      </div>
    </div>
  );
};

export default UserChat;
