import { decodeToken } from "../services/decodeToken";
import { emit, types } from "../utils/utils";

export const initChatApp = (socket, dispatch) => {
  (async () => {
    try {
      let { username } = await decodeToken();
      socket.on(types.USER_JOIN_CHAT, ({ userfriend }) => {
        dispatch({ type: types.USER_JOIN_CHAT, userfriend });
        dispatch({ type: "set-right-message", userfriend });
      });

      socket.on(emit.USER_LEAVE_CHAT, ({ userfriend }) => {
        dispatch({ type: types.USER_LEAVE_CHAT, userfriend });
        dispatch({ type: "set-left-message", userfriend });
      });

      socket.emit(types.USER_JOIN_CHAT, { username });

      dispatch({ type: types.SET_USERNAME, username });
      dispatch({ type: types.DISPLAY_LOADER, displayloader: false });
    } catch (error) {
      console.log(error.message);
    }
  })();
};
