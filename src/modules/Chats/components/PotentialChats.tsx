import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";

const PotentialChats = (props: any) => {
  const {} = props;
  const { potentialChats, createChat } = useContext(ChatContext);
  console.log(potentialChats);

  return <div>PotentialChats</div>;
};
