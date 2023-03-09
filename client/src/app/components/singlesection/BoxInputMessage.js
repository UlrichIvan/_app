import { memo, useCallback, useContext, useState } from "react";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { getNewSingleFormatMessage } from "../../helpers/getNewSingleFormatMessage";
import { emit } from "../../utils/utils";

const BoxInputMessage = () => {
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(false);
  const { state: chatState, socket } = useContext(chatdispatchcontext);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    let text = e.target.value;
    if (text.trim().length) setOpacity(true);
    else setOpacity(false);
    setText(text);
  }, []);

  const handlerSubmit = useCallback(
    (ok, e) => {
      e.preventDefault();
      let sms = encodeURIComponent(text);

      if (
        ok &&
        sms.trim().length &&
        chatState.username &&
        chatState.singleUser.name
      ) {
        socket.emit(
          emit.SEND_PRIVATE_SINGLE_MESSAGE,
          getNewSingleFormatMessage({
            username: chatState.username,
            singleUsername: chatState.singleUser.name,
            sms,
          })
        );
        setText("");
        setOpacity(false);
      } else console.log("not ok");
    },
    [text, socket, chatState.username, chatState.singleUser.name]
  );

  return (
    <form className="form-message" onSubmit={handlerSubmit.bind(null, opacity)}>
      <div className="box-input d-flex">
        <textarea
          className="text-box-messages"
          placeholder="write message here..."
          autoFocus
          value={text}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className={opacity ? "send-message active" : "send-message"}
        >
          <i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default memo(BoxInputMessage);
