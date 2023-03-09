import { types } from "../utils/utils";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_USERFRIENDS:
      return {
        ...state,
        groups: { ...state.groups, userFriends: [...action.users] },
      };
    case types.UPDATE_GROUPS:
      return {
        ...state,
        groups: { ...state.groups, userGroups: [...action.groups] },
      };
    case types.UPDATE_GROUPNAME:
      return {
        ...state,
        groups: { ...state.groups, name: action.name, pre: action.pre },
      };
    case types.UPDATE_GROUPMESSAGES:
      return {
        ...state,
        groups: { ...state.groups, messages: action.messages },
      };
    case types.ADD_NEW_GROUP_MESSAGE:
      let messages = [...state.groups.messages, action.message];
      return { ...state, groups: { ...state.groups, messages } };
    case types.UPDATE_SINGLE_USERNAME:
      return { ...state, singleUser: { ...action.singleUser } };
    case types.UNREAD_MESSAGES:
      let gps = state.groups.userGroups.length ? state.groups.userGroups : [];

      if (gps.length) {
        gps = gps.map((g) => {
          if (g.name === action.groupname) {
            g.unreadmessages = action.unread;
          }
          return g;
        });
        return { ...state, groups: { ...state.groups, userGroups: [...gps] } };
      } else {
        return state;
      }
    case types.UPDATE_LAST_GROUPNAME:
      return { ...state, lastgroupname: action.lastgroupname };

    case types.SET_USERNAME:
      return { ...state, username: action.username };
    case types.DISPLAY_LOADER:
      return { ...state, displayloader: action.displayloader };

    case types.UPDATE_TABNAME:
      return { ...state, tabname: action.tabname };

    case types.UPDATE_PAGE:
      return { ...state, page: action.page };

    case "toggle-setting":
      return { ...state, toggleSetting: !state.toggleSetting };

    case "reset-right-message":
      return { ...state, rightMessage: "" };

    case "reset-left-message":
      return { ...state, leftMessage: "" };

    case "set-right-message":
      let rightMessage = `${action.userfriend} is online`;
      return { ...state, rightMessage: rightMessage };

    case "set-left-message":
      let leftMessage = `${action.userfriend} is offline`;
      return { ...state, leftMessage: leftMessage };

    case "update-group-name":
      return {
        ...state,
        group: {
          name: action.name,
          pre: action?.pre ? action?.pre : action.name[0],
        },
      };

    case "messages-and-username-and-loader":
      return {
        ...state,
        username: action.username,
        messages: action.messages,
        displayloader: action.displayloader,
      };

    case types.USER_LEAVE_CHAT:
      let { usersconnected: friends } = state;
      let index = friends.findIndex((user) => user === action.userfriend);
      if (index !== -1) {
        friends = friends.splice(1, index);
        return { ...state, usersconnected: [...friends] };
      } else {
        // let leftMessage = `${action.userfriend} is offline`
        // return { ...state, leftMessage: leftMessage }
        return state;
      }

    case types.USER_JOIN_CHAT:
      let { usersconnected: usersfriends } = state;
      if (!usersfriends.includes(action.userfriend)) {
        return {
          ...state,
          usersconnected: [...usersfriends, action.userfriend],
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};
