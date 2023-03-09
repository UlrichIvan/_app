/**
 * @author <dreamwebfoundation@gmail.com>
 */

//necessary imports from this component

import "./chat.css";
import { useEffect, useReducer, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import {
  BASEURL,
  INIT_STATE_CHAT_APP,
  LINK_TO_LOGOUT,
  pages,
  tabLinks,
} from "../../utils/utils";
import { chatReducer } from "../../reducers/chatReducer";
import { initChatApp } from "../../helpers/initChatApp";
import UserSetting from "../../components/usersetting/UserSetting";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import GroupsSection from "../../components/groupssection/GroupsSection";
import Welcome from "../../components/welcome/Welcome";
import Loader from "../../components/loader/Loader";
import { io } from "socket.io-client";
import Notify from "../../components/notify/Notify";
import UserOptions from "../../components/useroptions/UserOptions";
import SingleSection from "../../components/singlesection/SingleSection";

/**
 * main component function from chat application
 * @returns JSX.Element
 */
function Chat() {
  // hooks necesary for life of this component

  const [state, dispatch] = useReducer(chatReducer, INIT_STATE_CHAT_APP);
  const [socket, setSocket] = useState(null);

  // init socket from all chat application
  useEffect(() => {
    if (socket === null) {
      setSocket(io.connect(BASEURL, { transports: ["websocket", "polling"] }));
    } else {
      socket.once("connect", () => {
        initChatApp(socket, dispatch);
        console.log("socket connected");
      });
    }
    return () => {
      if (socket) {
        console.log("unmonted");
        socket.off();
        if (socket.connected) socket.disconnect();
      }
    };
  }, [socket, dispatch]);

  return (
    <div className="chat">
      {/* wrapper loader from indicate that chat loading*/}
      <Loader display={state.displayloader} />

      {/* provider to send importants variables for subs components of chat application*/}
      <chatdispatchcontext.Provider value={{ dispatch, socket, state }}>
        {/* UserSetting component always display and content setting chat application,it's uses by user */}
        <UserSetting />

        {/* Nav bar for chat application */}
        <NavBar links={LINK_TO_LOGOUT} tabLinks={tabLinks} />

        {/* Welcome component it's display when page==accueil   */}
        {state.page === pages.ACCUEIL && <Welcome />}

        {/* PrivateMessages component it's display when page==groups */}
        {state.page === pages.GROUPES && <GroupsSection />}

        {/* PrivateMessages component it's display when page==groups */}
        {state.page === pages.SINGLE && <SingleSection />}

        {/* UserOptions component it's display when page==options   */}
        {state.page === pages.OPTIONS && <UserOptions />}
      </chatdispatchcontext.Provider>

      {/* message notification post at top right screen of user*/}
      {state.rightMessage && (
        <Notify
          type="right"
          message={state.rightMessage}
          reset={() => {
            dispatch({ type: "reset-right-message" });
          }}
        />
      )}

      {/* message notification post at top left screen of user*/}
      {state.leftMessage && (
        <Notify
          type="left"
          message={state.leftMessage}
          reset={() => dispatch({ type: "reset-left-message" })}
        />
      )}
    </div>
  );
}

export default Chat;
