// import React, {
//   createContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useCallback,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import {
//   createMessageUserChat,
//   createUserChat,
//   getMessageUserChat,
//   getUserChat,
// } from "../api/utils/chat";
// import { getListUserAll } from "../modules/Accounts/api";
// import { io } from "socket.io-client";
// import audio from "../assets/sound-bet.mp3";
// import { SOCKET_URL } from "../api/endpoint";

// // Define types for User and Chat
// interface Chat {
//   _id: string;
//   members: string[];
//   [key: string]: any; // Use this if the chat object can have other properties
// }

// // Define the context type
// interface ChatContextType {
//   userChats: Chat[] | null;
//   isUserChatsLoading: boolean;
//   userChatsError: string | null;
//   potentialChats: [];
//   createChat: (firstId: string, secondId: string) => Promise<void>;
//   updateCurrentChat: (chat: any) => Promise<void>;
//   currentChat: any;
//   messages: any;
//   isMessagesLoading: boolean;
//   messageError: string | null;
//   sendTextMessageError: null;
//   newMessage: null;
//   sendTextMessage: (
//     textMessage: any,
//     senderId: any,
//     currentChatId: any,
//     setTextMessage: any
//   ) => Promise<void>;
//   onlineUsers: any;
//   notifications: any;
//   markNotificationsAsRead: (n: any, userChats: any, notifications: any) => void;
//   markThisUserNotificationsAsRead: (
//     thisUserNotifications: any,
//     notifications: any
//   ) => void;
//   isChatOpen: boolean;
//   setIsChatOpen: Dispatch<SetStateAction<boolean>>;
// }

// // Create the context with a default value
// export const ChatContext = createContext<ChatContextType>({
//   userChats: null,
//   isUserChatsLoading: false,
//   userChatsError: null,
//   potentialChats: [],
//   createChat: async () => {},
//   updateCurrentChat: async () => {},
//   currentChat: null,
//   messages: null,
//   isMessagesLoading: false,
//   messageError: null,
//   sendTextMessageError: null,
//   newMessage: null,
//   sendTextMessage: async () => {},
//   onlineUsers: null,
//   notifications: [],
//   markNotificationsAsRead: () => {},
//   markThisUserNotificationsAsRead: () => {},
//   isChatOpen: false,
//   setIsChatOpen: () => {},
// });

// interface ChatContextProviderProps {
//   children: ReactNode;
//   isLogin: boolean;
// }

// export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
//   children,
//   isLogin,
// }) => {
//   const [userChats, setUserChats] = useState<Chat[] | null>(null);
//   const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
//   const [userChatsError, setUserChatsError] = useState<string | null>(null);
//   const [potentialChats, setPotentialChats] = useState<any>([]);
//   const [currentChat, setCurrentChat] = useState<any>(null);
//   const [messages, setMessages] = useState<any>(null);
//   const [isMessagesLoading, setIsMessagesLoading] = useState(false);
//   const [messageError, setMessageError] = useState<any>(null);
//   const [sendTextMessageError, setSendTextMessageError] = useState<any>(null);
//   const [newMessage, setNewMessage] = useState<any>(null);
//   const [socket, setSocket] = useState<any>(null);
//   const [onlineUsers, setOnlineUsers] = useState<any>(null);
//   const [notifications, setNotifications] = useState<any>([]);
//   const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // Add a state to track if the chat is open

//   const notificationSound = new Audio(audio);

//   //initial socket
//   useEffect(() => {
//     const newSocket = io(SOCKET_URL);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [isLogin]);

//   ///add onlien
//   useEffect(() => {
//     if (socket === null) return;
//     socket.emit("addNewUser", "6663d582b4788233da09fb70");
//     socket.on("getOnlineUsers", (res: any) => {
//       setOnlineUsers(res);
//     });

//     return () => {
//       socket.off("getOnlineUsers");
//     };
//   }, [socket]);

//   // send message
//   useEffect(() => {
//     if (socket === null || !newMessage) return;
//     const recipient = currentChat?.members?.find(
//       (member: any) => member._id !== "6663d582b4788233da09fb70"
//     );
//     const recipientId = recipient?._id;
//     socket.emit("sendMessage", { ...newMessage, recipientId });
//   }, [newMessage, currentChat, socket, "6663d582b4788233da09fb70"]);

//   // receive message and notification
//   useEffect(() => {
//     if (socket === null) return;

//     socket.on("getMessage", (res: any) => {
//       if (currentChat?._id === res.chatId) {
//         setMessages((prev: any) => [...prev, res]);
//       } else {
//         // Add a notification if the chat is not open
//         setNotifications((prev: any) => [res, ...prev]);
//         if (!isChatOpen) {
//           notificationSound.play();
//         }
//       }
//     });

//     socket.on("getNotification", (res: any) => {
//       const isChatOpen = currentChat?.members?.some(
//         (member: any) => member?._id === res.senderId
//       );

//       if (isChatOpen) {
//         setNotifications((prev: any) => [{ ...res, isRead: true }, ...prev]);
//       } else {
//         setNotifications((prev: any) => [res, ...prev]);
//         notificationSound.play();
//       }
//     });

//     return () => {
//       socket.off("getMessage");
//       socket.off("getNotification");
//     };
//   }, [socket, currentChat, isChatOpen]);

//   useEffect(() => {
//     const getUsers = async () => {
//       if (isLogin) {
//         try {
//           const response = await getListUserAll();
//           if (response.status) {
//             const pChats = response.result.filter((u: any) => {
//               let isChatCreated = false;

//               if (u?._id === "6663d582b4788233da09fb70") return false;

//               if (userChats) {
//                 isChatCreated = userChats?.some((chat) => {
//                   return chat?.members?.includes(u?._id);
//                 });
//               }

//               return !isChatCreated;
//             });
//             setPotentialChats(pChats);
//           }
//         } catch (e: any) {
//           console.error(e);
//         }
//       }
//     };
//     getUsers();
//   }, [isLogin, userChats, "6663d582b4788233da09fb70"]);

//   useEffect(() => {
//     const getUserChats = async () => {
//       if (isLogin) {
//         setIsUserChatsLoading(true);
//         try {
//           const response = await getUserChat("6663d582b4788233da09fb70");
//           if (response.status) {
//             setUserChats(response.result);
//           } else {
//             setUserChatsError(response.message);
//           }
//         } catch (e: any) {
//           setUserChatsError(e.message);
//         } finally {
//           setIsUserChatsLoading(false);
//         }
//       }
//     };
//     getUserChats();
//   }, ["6663d582b4788233da09fb70", isLogin]);

//   // messages
//   useEffect(() => {
//     const getMessages = async () => {
//       if (isLogin) {
//         setIsMessagesLoading(true);
//         try {
//           const response = await getMessageUserChat(currentChat?._id);
//           if (response.status) {
//             setMessages(response.result);
//           } else {
//             setMessageError(response.message);
//           }
//         } catch (e: any) {
//           // setMessageError(e.message);
//         } finally {
//           setIsMessagesLoading(false);
//         }
//       }
//     };
//     getMessages();
//   }, [currentChat, isLogin, "6663d582b4788233da09fb70"]);

//   const sendTextMessage = useCallback(
//     async (
//       textMessage: any,
//       senderId: any,
//       currentChatId: any,
//       setTextMessage: any
//     ) => {
//       let payload = {
//         chatId: currentChatId,
//         senderId: senderId,
//         text: textMessage,
//       };
//       try {
//         const response = await createMessageUserChat(payload);
//         if (response.status) {
//           setNewMessage(response.result);
//           setMessages((prev: any) => [...prev, response.result]);
//           setTextMessage("");
//         } else {
//           setSendTextMessageError(response.message);
//         }
//       } catch (e: any) {
//       } finally {
//       }
//     },
//     []
//   );

//   const updateCurrentChat = useCallback(async (chat: any) => {
//     setCurrentChat(chat);
//     setIsChatOpen(true); // Set chat open state to true when chat is updated
//   }, []);

//   // Tạo cuộc trò chuyện mới
//   const createChat = useCallback(async (firstId: string, secondId: string) => {
//     let payload = {
//       firstId: firstId,
//       secondId: secondId,
//     };
//     try {
//       const response = await createUserChat(payload);
//       if (response.status) {
//         setUserChats((prev: any) => [...prev, response.result]);
//       }
//     } catch (e: any) {
//     } finally {
//     }
//   }, []);

//   const markNotificationsAsRead = useCallback(
//     (n: any, userChats: any, notifications: any) => {
//       // FIND CHAT TO OPEN
//       const desiredChat = userChats.find((chat: any) => {
//         const chatMembers = ["6663d582b4788233da09fb70", n.senderId];
//         const isDesiredChat = chat?.members.every((member: any) => {
//           return chatMembers.includes(member);
//         });

//         return isDesiredChat;
//       });

//       //mark notification add read
//       const mNotifications = notifications.map((el: any) => {
//         if (n.senderId === el.senderId) {
//           return { ...n, isRead: true };
//         } else {
//           return el;
//         }
//       });
//       updateCurrentChat(desiredChat);
//       setNotifications(mNotifications);
//     },
//     []
//   );

//   const markThisUserNotificationsAsRead = useCallback(
//     (thisUserNotifications: any, notifications: any) => {
//       const mNotifications = notifications.map((el: any) => {
//         let notification;
//         thisUserNotifications.forEach((n: any) => {
//           if (n.senderId === el.senderId) {
//             notification = { ...n, isRead: true };
//           } else {
//             notification = el;
//           }
//         });

//         return notification;
//       });

//       setNotifications(mNotifications);
//     },
//     []
//   );
//   return (
//     <ChatContext.Provider
//       value={{
//         userChats,
//         isUserChatsLoading,
//         userChatsError,
//         potentialChats,
//         createChat,
//         updateCurrentChat,
//         currentChat,
//         messages,
//         isMessagesLoading,
//         messageError,
//         sendTextMessageError,
//         newMessage,
//         sendTextMessage,
//         onlineUsers,
//         notifications,
//         markNotificationsAsRead,
//         markThisUserNotificationsAsRead,
//         isChatOpen, // Provide chat open state
//         setIsChatOpen, // Provide function to set chat open state
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  createMessageUserChat,
  createUserChat,
  getMessageUserChat,
  getUserChat,
} from "../api/utils/chat";
import { getListUserAll } from "../modules/Accounts/api";
import { io } from "socket.io-client";
import audio from "../assets/sound-bet.mp3";
import { SOCKET_URL } from "../api/endpoint";

// Define types for User and Chat
interface Chat {
  _id: string;
  members: string[];
  [key: string]: any; // Use this if the chat object can have other properties
}

// Define the context type
interface ChatContextType {
  userChats: Chat[] | null;
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  potentialChats: [];
  createChat: (firstId: string, secondId: string) => Promise<void>;
  updateCurrentChat: (chat: any) => Promise<void>;
  currentChat: any;
  messages: any;
  isMessagesLoading: boolean;
  messageError: string | null;
  sendTextMessageError: null;
  newMessage: null;
  sendTextMessage: (
    textMessage: any,
    senderId: any,
    currentChatId: any,
    setTextMessage: any
  ) => Promise<void>;
  onlineUsers: any;
  notifications: any;
  markNotificationsAsRead: (n: any, userChats: any, notifications: any) => void;
  markThisUserNotificationsAsRead: (
    thisUserNotifications: any,
    notifications: any
  ) => void;
  setIsChatOpen: (isOpen: boolean) => void;
  isChatOpen: boolean;
  setUserChats: any;
}

// Create the context with a default value
export const ChatContext = createContext<ChatContextType>({
  userChats: null,
  isUserChatsLoading: false,
  userChatsError: null,
  potentialChats: [],
  createChat: async () => {},
  updateCurrentChat: async () => {},
  currentChat: null,
  messages: null,
  isMessagesLoading: false,
  messageError: null,
  sendTextMessageError: null,
  newMessage: null,
  sendTextMessage: async () => {},
  onlineUsers: null,
  notifications: [],
  markNotificationsAsRead: () => {},
  markThisUserNotificationsAsRead: () => {},
  setIsChatOpen: () => {},
  isChatOpen: false,
  setUserChats: null,
});

interface ChatContextProviderProps {
  children: ReactNode;
  isLogin: boolean;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
  isLogin,
}) => {
  const [userChats, setUserChats] = useState<Chat[] | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  const [potentialChats, setPotentialChats] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messageError, setMessageError] = useState<any>(null);
  const [sendTextMessageError, setSendTextMessageError] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // Add a state to track if the chat is open

  const notificationSound = new Audio(audio);

  //initial socket
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isLogin]);

  ///add online
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", "6663d582b4788233da09fb70");
    socket.on("getOnlineUsers", (res: any) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null || !newMessage) return;
    const recipient = currentChat?.members?.find(
      (member: any) => member._id !== "6663d582b4788233da09fb70"
    );
    const recipientId = recipient?._id;
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage, currentChat, socket, "6663d582b4788233da09fb70"]);

  // receive message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res: any) => {
      if (currentChat?._id === res.chatId) {
        setMessages((prev: any) => [...prev, res]);
      } else {
        // Add a notification if the chat is not open
        setNotifications((prev: any) => [res, ...prev]);
        if (!isChatOpen) {
          notificationSound.play();
        }
      }
    });

    socket.on("getNotification", (res: any) => {
      const isChatOpen = currentChat?.members?.some(
        (member: any) => member?._id === res.senderId
      );

      if (isChatOpen) {
        setNotifications((prev: any) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev: any) => [{ ...res, isRead: false }, ...prev]);
        notificationSound.play();
      }
      notificationSound.play();
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat, isChatOpen]);

  useEffect(() => {
    const getUsers = async () => {
      if (isLogin) {
        try {
          const response = await getListUserAll();
          if (response.status) {
            const pChats = response.result.filter((u: any) => {
              let isChatCreated = false;

              if (u?._id === "6663d582b4788233da09fb70") return false;

              if (userChats) {
                isChatCreated = userChats?.some((chat) => {
                  return chat?.members?.includes(u?._id);
                });
              }

              return !isChatCreated;
            });
            setPotentialChats(pChats);
          }
        } catch (e: any) {
          console.error(e);
        }
      }
    };
    getUsers();
  }, [isLogin, userChats, "6663d582b4788233da09fb70"]);

  useEffect(() => {
    const getUserChats = async () => {
      if (isLogin) {
        setIsUserChatsLoading(true);
        try {
          const response = await getUserChat("6663d582b4788233da09fb70");
          if (response.status) {
            setUserChats(response.result);
          } else {
            setUserChatsError(response.message);
          }
        } catch (e: any) {
          setUserChatsError(e.message);
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };
    getUserChats();
  }, ["6663d582b4788233da09fb70", isLogin]);

  // messages
  useEffect(() => {
    const getMessages = async () => {
      if (isLogin) {
        setIsMessagesLoading(true);
        try {
          const response = await getMessageUserChat(currentChat?._id);
          if (response.status) {
            setMessages(response.result);
          } else {
            setMessageError(response.message);
          }
        } catch (e: any) {
          // setMessageError(e.message);
        } finally {
          setIsMessagesLoading(false);
        }
      }
    };
    getMessages();
  }, [currentChat, isLogin, "6663d582b4788233da09fb70"]);

  const sendTextMessage = useCallback(
    async (
      textMessage: any,
      senderId: any,
      currentChatId: any,
      setTextMessage: any
    ) => {
      let payload = {
        chatId: currentChatId,
        senderId: senderId,
        text: textMessage,
      };
      try {
        const response = await createMessageUserChat(payload);
        if (response.status) {
          setNewMessage(response.result);
          setMessages((prev: any) => [...prev, response.result]);
          setTextMessage("");
        } else {
          setSendTextMessageError(response.message);
        }
      } catch (e: any) {
      } finally {
      }
    },
    []
  );

  const updateCurrentChat = useCallback(async (chat: any) => {
    setCurrentChat(chat);
    setIsChatOpen(true); // Set chat open state to true when chat is updated
  }, []);

  // Tạo cuộc trò chuyện mới
  const createChat = useCallback(async (firstId: string, secondId: string) => {
    let payload = {
      firstId: firstId,
      secondId: secondId,
    };
    try {
      const response = await createUserChat(payload);
      if (response.status) {
        setUserChats((prev: any) => [...prev, response.result]);
      }
    } catch (e: any) {
    } finally {
    }
  }, []);

  const markNotificationsAsRead = useCallback(
    (n: any, userChats: any, notifications: any) => {
      // FIND CHAT TO OPEN
      const desiredChat = userChats.find((chat: any) => {
        const chatMembers = ["6663d582b4788233da09fb70", n.senderId];
        const isDesiredChat = chat?.members.every((member: any) => {
          return chatMembers.includes(member);
        });

        return isDesiredChat;
      });

      //mark notification add read
      const mNotifications = notifications.map((el: any) => {
        if (n.senderId === el.senderId) {
          return { ...n, isRead: true };
        } else {
          return el;
        }
      });
      updateCurrentChat(desiredChat);
      setNotifications(mNotifications);
    },
    []
  );

  const markThisUserNotificationsAsRead = useCallback(
    (thisUserNotifications: any, notifications: any) => {
      const mNotifications = notifications.map((el: any) => {
        let notification;
        thisUserNotifications.forEach((n: any) => {
          if (n.senderId === el.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });

        return notification;
      });

      setNotifications(mNotifications);
    },
    []
  );
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messageError,
        sendTextMessageError,
        newMessage,
        sendTextMessage,
        onlineUsers,
        notifications,
        markNotificationsAsRead,
        markThisUserNotificationsAsRead,
        isChatOpen,
        setIsChatOpen,
        setUserChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
