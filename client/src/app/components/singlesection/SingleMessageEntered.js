import React, { memo } from "react";

const SingleMessageEntered = ({ data = null }) => {
  return (
    <>
      {data && (
        <div className="message-entered d-flex">
          <div className="message-content">
            <div className="user-send">{data.sender}</div>
            <div className="message">
              {decodeURIComponent(data.message.value)}
            </div>
            <div className="message-time">{data.message.at}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SingleMessageEntered);
