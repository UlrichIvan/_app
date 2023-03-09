import { memo } from "react";
import Loader from "../loader/Loader";

const SingleBodyMessages = ({ messages = null }) => {
  return (
    <>
      {<Loader display={messages === null} />}
      {messages && <div className="single-body-messages">{messages}</div>}
    </>
  );
};

export default memo(SingleBodyMessages);
