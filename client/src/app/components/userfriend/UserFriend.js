import { useCallback, useContext } from "react";
import { chatdispatchcontext } from "../../context/chatdispatchContext";
import { UcFirst } from "../../helpers/UcFirst";
import { pages, types } from "../../utils/utils";

const UserFriend = ({ f = null, isauth = false }) => {
  const { state: chatState, dispatch: chatDispatch } =
    useContext(chatdispatchcontext);
  const handleClick = useCallback(
    (f, e) => {
      e.preventDefault();
      if (chatState.singleUser.name.toLowerCase() !== f.name.toLowerCase()) {
        chatDispatch({
          type: types.UPDATE_SINGLE_USERNAME,
          singleUser: { name: f.name, isauth: isauth },
        });
        if (chatState.tabname.toLowerCase() !== pages.SINGLE.toLowerCase()) {
          chatDispatch({
            type: types.UPDATE_TABNAME,
            tabname: pages.SINGLE,
          });
        }
      }
    },
    [chatState.singleUser.name, chatDispatch, chatState.tabname, isauth]
  );

  return (
    <>
      {f && (
        <li
          className="f d-flex align-items-center justify-content-between"
          onClick={handleClick.bind(null, f)}
        >
          <div className="f-infos d-flex align-items-center">
            <span
              className="f-pre d-flex justify-content-center align-items-center"
              title={UcFirst(f.name)}
            >
              {f.name[0]}
            </span>
            <span className="f-name">{f.name}</span>
          </div>
          <div className={isauth === true ? "f-online" : "f-offline"}>
            <i className="fa fa-circle" area-hidden="true"></i>
          </div>
        </li>
      )}
    </>
  );
};

export default UserFriend;
