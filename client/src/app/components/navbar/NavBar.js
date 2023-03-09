import "./navbar.css";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../helpers/signOut";
import NavLinksItems from "../navlinkitems/NavLinksItems";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { emit, pages, types } from "../../utils/utils";

function NavBar({ links = [], tabLinks = [] }) {
  const {
    socket,
    state: chatState,
    dispatch: dispatchChat,
  } = useContext(chatdispatchcontext);

  const [tabs, setTabs] = useState(tabLinks);

  const redirect = useNavigate();

  useEffect(() => {
    if (chatState.tabname !== chatState.page) {
      let target = "";
      let tbs = tabs.map((t) => {
        if (t.name.toLowerCase() === chatState.tabname.toLowerCase()) {
          t.active = true;
          t.unreadmessages = false;
          target = t.name;
        } else t.active = false;
        return t;
      });

      setTabs(tbs);
      dispatchChat({ type: types.UPDATE_PAGE, page: target });
    }
  }, [tabs, chatState.tabname, chatState.page, dispatchChat]);

  const handlerReceiveMessage = useCallback(
    (tabname, _) => {
      if (tabname.toLowerCase() !== pages.SINGLE.toLocaleLowerCase()) {
        let tbs = tabs.map((t) => {
          if (t.name.toLowerCase() === pages.SINGLE.toLocaleLowerCase()) {
            t.unreadmessages = true;
          }
          return t;
        });
        setTabs(tbs);
      }
    },
    [tabs]
  );
  useEffect(() => {
    if (socket) {
      socket.on(
        emit.RECEIVE_PRIVATE_SINGLE_MESSAGE,
        handlerReceiveMessage.bind(null, chatState.tabname)
      );
    }
    return () => {
      if (socket) socket.off(emit.RECEIVE_PRIVATE_SINGLE_MESSAGE);
    };
  }, [socket, handlerReceiveMessage, chatState.tabname]);

  const handlerTabClick = useCallback(
    (tab, e) => {
      e.preventDefault();
      if (tab.name.toLowerCase() === pages.SINGLE.toLowerCase()) {
        if (chatState.singleUser.name)
          dispatchChat({ type: types.UPDATE_TABNAME, tabname: tab.name });
      } else {
        dispatchChat({ type: types.UPDATE_TABNAME, tabname: tab.name });
      }
    },
    [dispatchChat, chatState.singleUser.name]
  );

  const logOut = useCallback(
    async (e) => {
      e.preventDefault();
      dispatchChat({ type: types.DISPLAY_LOADER, displayloader: true });
      signOut(socket, redirect, chatState.username, dispatchChat);
    },
    [socket, chatState, dispatchChat, redirect]
  );

  useEffect(() => {
    if (socket) {
      socket.on(emit.DISPATCH_GROUP_MESSAGE, ({ data, groupname, pre }) => {
        if (chatState.page !== pages.GROUPES && tabs.length) {
          let tbs = tabs.map((tab) => {
            if (tab.name === pages.GROUPES) {
              tab.unreadmessages = true;
            }
            return tab;
          });
          setTabs(tbs);
          dispatchChat({ type: types.UPDATE_GROUPNAME, name: groupname, pre });
          dispatchChat({ type: types.ADD_NEW_GROUP_MESSAGE, message: data });
        }
      });
    }
    return () => {
      if (socket) socket.off(emit.DISPATCH_GROUP_MESSAGE);
    };
  }, [socket, chatState.page, dispatchChat, tabs]);

  return (
    <>
      <nav className="nav-bar navbar-vw  d-flex justify-content-between align-items-center">
        <div className="nav-brand d-flex justify-content-center align-items-center">
          <ul className="chat-links d-flex align-items-center">
            {tabs.map((tab, i) => {
              return (
                <li
                  key={i}
                  onClick={handlerTabClick.bind(null, tab)}
                  className={`message-link-item ${
                    tab.unreadmessages ? "unreadmessages" : ""
                  }`}
                >
                  <span
                    className={tab.active ? "text-brand active" : "text-brand"}
                  >
                    <span className="message-icon">
                      <i className={tab.icon} aria-hidden={"true"}></i>
                    </span>
                    <span className="message-tab">{tab.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <NavLinksItems links={links} logOut={logOut} />
      </nav>
    </>
  );
}

export default memo(NavBar);
