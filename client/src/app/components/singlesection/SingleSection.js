import "./css/SingleSection.css";
import SingleFriendDescription from "./SingleFriendDescription";
import UserFriendDescriptions from "./UserFriendDescriptions";
import FilesSingleSection from "./FilesSingleSection";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import SingleMessageEntered from "./SingleMessageEntered";
import BoxInputMessage from "./BoxInputMessage";
import ChatAreaMessages from "./chatAreaMessages";
import { getSingleMessages } from "../../services/getSingleMessages";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import SingleMessageSend from "./SingleMessageSend";
import SingleBodyMessages from "./SingleBodyMessages";
import NoMessages from "./NoMessages";
import { emit, types } from "../../utils/utils";

const SingleSection = () => {
  const [sms, setSms] = useState([]);
  const {
    state: chatState,
    socket,
    dispatch,
  } = useContext(chatdispatchcontext);

  useEffect(() => {
    (async () => {
      try {
        if (chatState.singleUser.name) {
          let { data } = await getSingleMessages(chatState.singleUser.name);
          setSms(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [chatState.singleUser.name]);

  useEffect(() => {
    socket.on(emit.RECEIVE_PRIVATE_SINGLE_MESSAGE, (data) => {
      if (
        data.sender === chatState.username ||
        data.receiver === chatState.singleUser.name
      ) {
        let messages = [...sms, data];
        setSms(messages);
      }
    });

    return () => {
      if (socket) socket.off(emit.RECEIVE_PRIVATE_SINGLE_MESSAGE);
    };
  }, [socket, sms, chatState.singleUser.name, chatState.username]);

  let messages = useMemo(() => {
    let data = [];
    if (sms.length) {
      data = sms.map((s, i) => {
        if (s.sender === chatState.username) {
          return <SingleMessageSend key={i} data={s} />;
        } else {
          return <SingleMessageEntered key={i} data={s} />;
        }
      });
      return data;
    }
    return <NoMessages username={chatState.username} />;
  }, [sms, chatState.username]);

  const handlerStateChat = useCallback(
    ({ isauth = false, username }) => {
      if (chatState.singleUser.name.toLowerCase() === username.toLowerCase()) {
        console.log("handlerStateChat", { isauth, username });
        dispatch({
          type: types.UPDATE_SINGLE_USERNAME,
          singleUser: {
            name: username,
            isauth,
          },
        });
      }
    },
    [dispatch, chatState.singleUser.name]
  );

  useEffect(() => {
    if (socket) {
      socket.on(types.USER_LEAVE_CHAT, ({ userfriend }) => {
        // console.log({ userfriend }, "leave");
        handlerStateChat({ isauth: false, username: userfriend });
      });
      socket.on(types.USER_JOIN_CHAT, ({ userfriend }) => {
        // console.log({ userfriend }, "join");
        handlerStateChat({ isauth: true, username: userfriend });
      });
    }
    return () => {
      if (socket) {
        socket.off(types.USER_LEAVE_CHAT);
        socket.off(types.USER_JOIN_CHAT);
      }
    };
  }, [socket, handlerStateChat]);

  return (
    <div className="single-section">
      <div className="chat-container d-flex">
        <SingleFriendDescription>
          <UserFriendDescriptions
            name={chatState.singleUser.name}
            pre={chatState.singleUser.name[0]}
            isauth={chatState.singleUser.isauth}
          />
          <FilesSingleSection />
        </SingleFriendDescription>
        <ChatAreaMessages>
          <SingleBodyMessages messages={messages} />
          <BoxInputMessage />
        </ChatAreaMessages>
      </div>
    </div>
  );
};

export default memo(SingleSection);
