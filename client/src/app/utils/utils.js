export const rgxName = /^[a-z]{4,8}$/;
export const rgxPassword = /^[a-z0-9]{5,10}$/;
export const BASEURL = "http://localhost:4000";
export const LOGIN_ERROR_MESSAGE = "invalid name or password";
export const ERROR_NAME_MESSAGE = "name must be have [4,8] letters";
export const ERROR_PASSWORD_MESSAGE =
  "password must be have [5,10] alphanumeric characteres";
export const NAME_ALL_READY_EXISTS = "name already taken";
export const ERROR_OCCURED = "Error occured please try again";
export const LINK_TO_HOME = [
  {
    path: "/login",
    name: "login",
  },
];

export const LINK_TO_LOGOUT = [
  {
    path: "/logout",
    name: "logout",
  },
];
export const INIT_STATE_SETTINGS_APP = {
  friends: [],
};
export const pages = {
  ACCUEIL: "home",
  SINGLE: "private",
  GROUPES: "groups",
  OPTIONS: "options",
};

export const tabLinks = [
  {
    name: pages.ACCUEIL,
    icon: "fa fa-home",
    active: false,
    unreadmessages: false,
  },
  {
    name: pages.GROUPES,
    icon: "fa fa-users",
    active: true,
    unreadmessages: false,
  },
  {
    name: pages.SINGLE,
    icon: "fa fa-commenting-o",
    active: false,
    unreadmessages: false,
  },
  {
    name: pages.OPTIONS,
    icon: "fa fa-cog",
    active: false,
    unreadmessages: false,
  },
];

export const types = {
  USER_JOIN_CHAT: "USER_JOIN_CHAT",
  UPDATE_PAGE: "UPDATE_PAGE",
  UPDATE_TABNAME: "UPDATE_TABNAME",
  UPDATE_SINGLE_USERNAME: "UPDATE_SINGLE_USERNAME",
  UPDATE_GROUPS: "UPDATE_GROUPS",
  UPDATE_GROUPNAME: "UPDATE_GROUPNAME",
  UPDATE_GROUPMESSAGES: "UPDATE_GROUPMESSAGES",
  USER_GROUP_TYPING: "USER_GROUP_TYPING",
  ADD_NEW_GROUP_MESSAGE: "ADD_NEW_GROUP_MESSAGE",
  RESET_TYPING_MESSAGE: "RESET_TYPING_MESSAGE",
  UNREAD_MESSAGES: "UNREAD_MESSAGES",
  DISPLAY_LOADER: "DISPLAY_LOADER",
  SET_USERNAME: "SET_USERNAME",
  USER_LEAVE_CHAT: "USER_LEAVE_CHAT",
  UPDATE_USERFRIENDS: "UPDATE_USERFRIENDS",
  UPDATE_LAST_GROUPNAME: "UPDATE_LAST_GROUPNAME",
};
export const emit = {
  RECEIVE_PRIVATE_SINGLE_MESSAGE: "RECEIVE_PRIVATE_SINGLE_MESSAGE",
  SEND_PRIVATE_SINGLE_MESSAGE: "SEND_PRIVATE_SINGLE_MESSAGE",
  SEND_PRIVATE_GROUP_MESSAGE: "SEND_PRIVATE_GROUP_MESSAGE",
  TYPING_MESSAGE_GROUP: "TYPING_MESSAGE_GROUP",
  USER_TYPING_MESSAGE_GROUP: "USER_TYPING_MESSAGE_GROUP",
  DISPATCH_GROUP_MESSAGE: "DISPATCH_GROUP_MESSAGE",
  USER_LEAVE_CHAT: "USER_LEAVE_CHAT",
};

export const INIT_STATE_CHAT_APP = {
  username: "",
  displayloader: true,
  usersconnected: [],
  userdiconnected: "",
  rightMessage: "",
  leftMessage: "",
  toggleSetting: false,
  page: pages.GROUPES,
  group: { name: "", pre: "" },
  lastgroupname: "",
  singleUser: { name: "", isauth: false },
  tabname: pages.GROUPES,
  groups: {
    name: "",
    pre: "",
    userFriends: [],
    messages: [],
    userGroups: [],
  },
};
export const INIT_STATE_FORM_ACCOUNT = {
  name: "",
  errorName: "",
  password: "",
  errorPassword: "",
  globalMessage: "",
};
export const TypingStyle = {
  color: "rgba(255, 255, 255, 0.61)",
  textTransform: "Capitalize",
  textAlign: "center",
  fontWeight: 900,
  height: "10px",
  marginBottom: "1rem",
};

export const docs = [
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "w",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.w",
  },
  {
    type: "w",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.w",
  },
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "w",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.w",
  },
  {
    type: "w",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.word",
  },
  {
    type: "pdf",
    name: "mon Cv",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
];
export const links = [
  {
    type: "link",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "link",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    type: "link",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
];
export const docsTabNames = {
  DOCS: "docs",
  LINKS: "links",
  MEDIA: "media",
};
export const docsTab = [
  { name: docsTabNames.DOCS, active: true },
  { name: docsTabNames.LINKS, active: false },
  { name: docsTabNames.MEDIA, active: false },
];
export const media = [
  {
    name: "judikay",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "file-video-o",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "file-video-o",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "file-video-o",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "headphones",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "file-video-o",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
  {
    name: "ks bloom",
    type: "file-video-o",
    link: "https://localhost:3000/docs/mon cv.pdf",
  },
];
