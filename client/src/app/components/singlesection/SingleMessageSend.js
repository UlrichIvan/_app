import { memo } from "react";

const SingleMessageSend = ({ data = null }) => {
  return (
    <>
      {data && (
        <div className="message-send d-flex">
          <div className="message-content">
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

export default memo(SingleMessageSend);
