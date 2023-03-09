/**
 * @author <dreamwebfoundation@gmail.com>
 */

//necessary imports from this component

import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { fetMessagesFromGroup } from "../../services/GroupsSection/fetMessagesFromGroup";
import getMessages from "../../helpers/getMessages";
import { messageReducer } from "../../reducers/messageReducer";
import { fetchGroupsFromUser } from "../../services/GroupsSection/FetchGroupsFromUser.services";
import { emit, types } from "../../utils/utils";
import GroupHeader from "../groups/GroupHeader";
import Groups from "../groups/Groups";
import UserInfosDescriptions from "../userinfos/UserInfosDescriptions";
import UserInsideOfGroup from "../userinsideofgroup/UserInsideOfGroup";
import { fetUsersFromGroup } from "../../services/fetUsersFromGroup";
import ChatMessagesCenter from "./ChatMessagesCenter";
import ChatDescription from "./ChatDescription";

/**
 * manage all groups converstions
 * @returns JSX.Element
 */
const GroupsSection = () => {
  // all utils states for component
  // const [displayloader, setdisplayloader] = useState(true)
  const [displaySearch, setdisplaySearch] = useState(false);
  const [search, setSearch] = useState("");
  const [stateMessages, dispatch] = useReducer(messageReducer, {
    messages: [],
    group: { name: "", pre: "" },
    groups: [],
    messageTyping: "",
    // display: false,
  });

  // get state,socket and dispatch for global chatComponent
  const {
    state: chatState,
    socket,
    dispatch: chatDispatch,
  } = useContext(chatdispatchcontext);

  // Fetch all groups from user connected
  useEffect(() => {
    (async () => {
      let groups = [];

      if (chatState.groups.userGroups.length === 0) {
        groups = await fetchGroupsFromUser();

        if (groups.length) {
          chatDispatch({ type: types.UPDATE_GROUPS, groups });
          if (!chatState.groups.name && !chatState.groups.pre) {
            // update header from right sidebar with group it has notifications
            chatDispatch({
              type: types.UPDATE_GROUPNAME,
              name: groups[0].name,
              pre: groups[0].pre,
            });
          }
        }
      }
    })();
  }, [
    chatDispatch,
    chatState.groups.userGroups,
    chatState.groups.name,
    chatState.groups.pre,
  ]);

  useEffect(() => {
    (async () => {
      if (chatState.lastgroupname !== chatState.groups.name) {
        let data = await fetUsersFromGroup(chatState.groups.name);

        if (data.hasOwnProperty("users")) {
          const { users } = data;
          if (users.length) {
            chatDispatch({ type: types.UPDATE_USERFRIENDS, users });
            chatDispatch({
              type: types.UPDATE_LAST_GROUPNAME,
              lastgroupname: chatState.groups.name,
            });
          }
        }
      }
    })();
  }, [chatState.groups.name, chatState.lastgroupname, chatDispatch]);

  // update messages of groups
  const updateMessages = useCallback(
    (data) => {
      if (data && data.hasOwnProperty("messages")) {
        let { messages } = data;
        if (messages.length) {
          chatDispatch({ type: types.UPDATE_GROUPMESSAGES, messages });
        }
      }
    },
    [chatDispatch]
  );

  /** fetch all messages from specify group of user */
  useEffect(() => {
    (async () => {
      try {
        if (chatState.lastgroupname !== chatState.groups.name) {
          // default messages for current group
          let data = await fetMessagesFromGroup(chatState.groups.name);
          updateMessages(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [chatState.groups.name, chatState.lastgroupname, updateMessages]);

  /* update messages with new entry message */
  useEffect(() => {
    if (socket) {
      socket.on(emit.DISPATCH_GROUP_MESSAGE, ({ data, groupname }) => {
        if (
          groupname &&
          data &&
          data.hasOwnProperty("sender") &&
          chatState.groups.name
        ) {
          if (groupname === chatState.groups.name) {
            chatDispatch({ type: types.ADD_NEW_GROUP_MESSAGE, message: data });
          } else {
            chatDispatch({
              type: types.UNREAD_MESSAGES,
              groupname,
              unread: true,
            });
          }
        }
      });
    }
    return () => {
      if (socket) socket.off(emit.DISPATCH_GROUP_MESSAGE);
    };
  }, [socket, chatDispatch, chatState.groups.name]);

  // display user typing message
  useEffect(() => {
    if (socket) {
      socket.on(emit.USER_TYPING_MESSAGE_GROUP, ({ username, groupname }) => {
        if (groupname === chatState.groups.name) {
          dispatch({ type: types.USER_GROUP_TYPING, username });
        }
      });
    }
    return () => {
      if (socket) socket.off(emit.USER_TYPING_MESSAGE_GROUP);
    };
  }, [socket, dispatch, chatState.groups.name]);

  // hide or show input search groups for user
  const handlerSearch = useCallback(
    (e) => {
      e.preventDefault();
      setdisplaySearch(!displaySearch);
      setSearch("");
    },
    [displaySearch, setSearch, setdisplaySearch]
  );

  // memory all messages for current group
  const displayMessages = useMemo(() => {
    if (chatState.groups.messages.length && chatState.username) {
      return getMessages(chatState.groups.messages, chatState.username);
    }
  }, [chatState.groups.messages, chatState.username]);

  // reset message effect typing on area message
  const reset = useCallback(() => {
    if (stateMessages.messageTyping)
      dispatch({ type: types.RESET_TYPING_MESSAGE });
  }, [dispatch, stateMessages.messageTyping]);

  const usersInGroup = useMemo(() => {
    return (
      <UserInsideOfGroup
        group={chatState.groups}
        username={chatState.username}
      />
    );
  }, [chatState.groups, chatState.username]);
  return (
    <div className="chat-container d-flex">
      {/* left section: users in the group */}
      {usersInGroup}

      {/* center section: messages section */}
      <ChatMessagesCenter
        messages={displayMessages}
        hasMessage={chatState.groups.messages.length}
        messageTyping={stateMessages.messageTyping}
        groups={chatState.groups}
        reset={reset}
      />

      {/* right section: group descriptions */}
      <ChatDescription usersInGroup={usersInGroup}>
        {chatState.groups.name && (
          <>
            <UserInfosDescriptions
              name={chatState.groups.name}
              pre={chatState.groups.pre}
            />
            <GroupHeader
              displaySearch={displaySearch}
              setSearch={setSearch}
              search={search}
              handlerSearch={handlerSearch}
            />
          </>
        )}
        <Groups
          group={{ name: chatState.groups.name, pre: chatState.groups.pre }}
          groups={chatState.groups.userGroups}
          search={search}
        />
      </ChatDescription>
    </div>
  );
};

export default memo(GroupsSection);
