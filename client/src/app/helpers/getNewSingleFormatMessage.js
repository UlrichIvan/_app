export const getNewSingleFormatMessage = ({
  username,
  singleUsername,
  sms,
  type = "text",
}) => {
  return {
    sender: username,
    receiver: singleUsername,
    token: localStorage.getItem("user-local"),
    message: {
      type: type,
      value: sms,
      at: "",
      see: false,
    },
  };
};
