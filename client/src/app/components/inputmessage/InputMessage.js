/**
 * @author <dreamwebfoundation@gmail.com>
 */

// importants importations from this component
import { memo, useCallback, useContext, useState } from "react";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { emit } from "../../utils/utils";

/**
 * manage message input from current message send by user
 * @returns JSX.Element
 */
const InputMessage = ({ group = null }) => {
  // all necessaries hooks for life of this component

  const [message, setMessage] = useState("");
  const [opacity, setOpacity] = useState(false);
  const { socket, state: chatState } = useContext(chatdispatchcontext);
  const handlerMessageChange = useCallback((e) => {
    if (e.target.value.trim().length) {
      setOpacity(true);
    } else {
      setOpacity(false);
    }
    setMessage(e.target.value);
  }, []);

  // when user send message
  const handlerMessageSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (opacity && message.trim().length && socket && group.name) {
        socket.emit(emit.SEND_PRIVATE_GROUP_MESSAGE, {
          token: localStorage.getItem("user-local"),
          pre: group.pre,
          groupname: group.name,
          message,
          type: "text",
        });
        setMessage("");
        setOpacity(false);
      }
    },
    [socket, opacity, message, group.name, group.pre]
  );

  // when user typing message
  const hanlderKeyUp = useCallback(() => {
    if (socket && group.name && chatState.username) {
      socket.emit(emit.TYPING_MESSAGE_GROUP, {
        username: chatState.username,
        groupname: group.name,
      });
    }
  }, [chatState.username, socket, group.name]);

  return (
    <>
      <form className="typing-message d-flex" onSubmit={handlerMessageSubmit}>
        <textarea
          onKeyUp={hanlderKeyUp}
          value={message}
          onChange={handlerMessageChange}
          className="area-message"
          autoFocus={"on"}
          placeholder="type message here..."
        ></textarea>
        <button
          type="submit"
          className="message-send"
          style={{ color: opacity ? "white" : "#ffffff61" }}
        >
          <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
        </button>
      </form>
    </>
  );
};

export default memo(InputMessage);
