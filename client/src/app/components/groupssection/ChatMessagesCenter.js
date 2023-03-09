import React, { memo, useCallback, useRef, useState } from "react";
import InputMessage from "../inputmessage/InputMessage";
import UserTyping from "../usertype/UserTyping";

const ChatMessagesCenter = ({
  messages = [],
  hasMessages = false,
  messageTyping = "",
  groups = [],
  reset = null,
}) => {
  const [show, setShow] = useState(true);
  const refBody = useRef(null);

  // memory of scroll Component for area messages
  //   const down = useCallback((messages = [], refBody) => {
  //     if (messages.length)
  //       return <ScrollBottom el={refBody.current} v={messages.length} />;
  //     else return null;
  //   }, []);

  const handlerScroll = useCallback((e) => {
    const wrapper = e.currentTarget;
    const percent =
      (Math.round(wrapper.clientHeight + wrapper.scrollTop) * 100) /
      wrapper.scrollHeight;
    if (percent >= 90) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);
  const handlerClick = useCallback(
    (e) => {
      e.preventDefault();
      refBody.current.scroll({
        top: refBody.current.scrollHeight * 100,
        left: 0,
        behavior: "smooth",
      });
    },
    [refBody]
  );

  return (
    <>
      <div className="chat-message-center">
        {show && (
          <div
            className="scroll-dow d-flex justify-content-center align-items-center"
            onClick={handlerClick}
          >
            <i className="fa fa-arrow-down" aria-hidden="true"></i>
          </div>
        )}
        {hasMessages === 0 && (
          <div
            className="loader-messages"
            style={{ color: "#fff", textAlign: "center" }}
          >
            loading...
          </div>
        )}
        <div className="body-messages" ref={refBody} onScroll={handlerScroll}>
          {messages}
          {<UserTyping sms={messageTyping} time={300} reset={reset} />}
        </div>
        <InputMessage group={groups} />
        {/* {down(messages, refBody)} */}
      </div>
    </>
  );
};

export default memo(ChatMessagesCenter);
