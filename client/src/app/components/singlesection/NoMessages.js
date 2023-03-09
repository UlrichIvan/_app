import { memo } from "react";

const Nomessages = ({ username = null }) => {
  return (
    <>
      {username && (
        <div className="no-messages">
          <p>
            You don't have messages in this conversation,to init it set message
            to {username}{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default memo(Nomessages);
