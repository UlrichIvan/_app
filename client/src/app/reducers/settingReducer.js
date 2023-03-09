export const settingReducer = (state = [], action) => {
  switch (action.type) {
    case "update-friend-auth":
      console.log("update-friend-auth", action.name);
      let userfriends = state.friends;
      let users = userfriends.map((u) => {
        if (u.name === action.name) {
          u.isauth = action.isauth;
        }
        return u;
      });
      console.log("update-friend-auth");
      return { ...state, friends: [...users] };
    case "setfriends":
      return { ...state, friends: [...action.users] };
    default:
      return state;
  }
};
