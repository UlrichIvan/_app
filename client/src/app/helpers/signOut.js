import { disconnectUser } from "../services/disconnectUser";
import { types } from "../utils/utils";

export const signOut = async (socket, redirect, username, dispatchChat) => {
  try {
    let { isdiconnected } = await disconnectUser();

    if (isdiconnected) {
      localStorage.removeItem("user-local");
      socket.emit(types.USER_LEAVE_CHAT, { username });
      redirect("/", { replace: true });
    } else {
      dispatchChat({ type: types.DISPLAY_LOADER, displayloader: false });
    }
  } catch (error) {
    console.log(error.message);
    dispatchChat({ type: types.DISPLAY_LOADER, displayloader: false });
  }
};
