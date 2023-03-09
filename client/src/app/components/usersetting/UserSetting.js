import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { settingReducer } from "../../reducers/settingReducer";
import { getFriends } from "../../services/getFriends";
import { INIT_STATE_SETTINGS_APP, types } from "../../utils/utils";
import UserInfos from "../userinfos/UserInfos";
import UserFriends from "../usersfriends/UserFriends";
import "./usersetting.css";
const UserSetting = () => {
  const [state, dispatch] = useReducer(settingReducer, INIT_STATE_SETTINGS_APP);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [search, setSearch] = useState("");
  const { socket, state: chatState } = useContext(chatdispatchcontext);

  const handlerSearch = useCallback(
    (e) => {
      e.preventDefault();
      setDisplaySearch(!displaySearch);
      setSearch("");
    },
    [displaySearch, setSearch, setDisplaySearch]
  );

  useEffect(() => {
    if (socket) {
      socket.on(types.USER_LEAVE_CHAT, ({ userfriend }) => {
        console.log(types.USER_LEAVE_CHAT);
        dispatch({
          type: "update-friend-auth",
          name: userfriend,
          isauth: false,
        });
      });
      socket.on(types.USER_JOIN_CHAT, ({ userfriend }) => {
        console.log(types.USER_JOIN_CHAT);
        dispatch({
          type: "update-friend-auth",
          name: userfriend,
          isauth: true,
        });
      });
    } else {
      console.log("not socket");
    }
    return () => {
      if (socket) {
        console.log("userssetings unmount");
        socket.off(types.USER_LEAVE_CHAT);
        socket.off(types.USER_JOIN_CHAT);
      }
    };
  }, [socket, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        let { users } = await getFriends();
        dispatch({ type: "setfriends", users });
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <div
        className={
          chatState.toggleSetting ? "chat-setting  slide-left" : "chat-setting"
        }
      >
        {chatState.username && <UserInfos username={chatState.username} />}

        {state.friends.length > 0 && (
          <UserFriends
            displaySearch={displaySearch}
            handlerSearch={handlerSearch}
            setSearch={setSearch}
            search={search}
            friends={state.friends}
          />
        )}
      </div>
    </>
  );
};

export default UserSetting;
