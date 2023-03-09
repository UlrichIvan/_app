import { memo } from "react";

const chatAreaMessages = ({ children }) => {
  return <div className="chat-Area-messages">{children}</div>;
};

export default memo(chatAreaMessages);
