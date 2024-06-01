import React, { useEffect, useState } from "react";
import { getLiveChat } from "../apis";
import { getAccessToken } from "../apis/getAccessToken";

type Props = {};

const LiveChat = (props: Props) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessToken();
        console.log(token);
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  //   const chats = useLiveChat(accessToken);
  return <div>LiveChat</div>;
};

export default LiveChat;
