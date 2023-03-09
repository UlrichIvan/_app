import React from "react";

const ChatDescription = ({ children, usersInGroup = null }) => {
  return (
    <>
      <div className="chat-descriptions">
        {children}
        {usersInGroup}
      </div>
    </>
  );
};

export default ChatDescription;
