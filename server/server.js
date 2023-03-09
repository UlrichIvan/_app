// init all utils variables from backend about this file

const express = require("express");
const app = express();
const Router = require("./routes/router");
const { SOCKECT_OPTIONS, emit } = require("./constants");
const cors = require("cors");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { tokenIsvalid } = require("./middlewares");
const { updateGroupMessages, saveSingleMessage } = require("./database/utils");
const io = new Server(server, SOCKECT_OPTIONS);

// listen current socket connection
io.on("connection", (socket) => {
  console.log("user connect on server: id= " + socket.id);

  // user leave a chat
  socket.on("disconnect", () => {
    console.log("user " + socket.id + " has been disconnected");
  });

  // new private entry message
  socket.on(
    emit.SEND_PRIVATE_GROUP_MESSAGE,
    async ({ message = "", groupname = "", pre = "", type, token = "" }) => {
      try {
        let { username } = tokenIsvalid(token);
        if (username && message.length && groupname && type) {
          let { data } = await updateGroupMessages({
            groupname,
            username,
            message,
            type,
          });
          // console.log(data)
          io.emit(emit.DISPATCH_GROUP_MESSAGE, { data, groupname, pre });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  );
  // new single private message
  socket.on(emit.SEND_PRIVATE_SINGLE_MESSAGE, async (data) => {
    try {
      let { username } = tokenIsvalid(data?.token);
      if (
        username &&
        username === data?.sender &&
        username !== data?.receiver
      ) {
        let answer = await saveSingleMessage(data);
        if (answer?.res?.saved) {
          socket.emit(emit.RECEIVE_PRIVATE_SINGLE_MESSAGE, answer.data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  });
  // user typing message
  socket.on(emit.TYPING_MESSAGE_GROUP, ({ username, groupname }) => {
    socket.broadcast.emit(emit.USER_TYPING_MESSAGE_GROUP, {
      username,
      groupname,
    });
  });

  // user is connected successfully on chat application
  socket.on(emit.USER_JOIN_CHAT, ({ username }) => {
    console.log(username, "join chat");
    socket.broadcast.emit(emit.USER_JOIN_CHAT, { userfriend: username });
  });

  // user leave a chat application
  socket.on(emit.USER_LEAVE_CHAT, ({ username }) => {
    console.log(username, "leave chat");

    socket.broadcast.emit(emit.USER_LEAVE_CHAT, { userfriend: username });
  });
});

// add middlewares for backend application
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"));
app.use(Router);

// run server on specfy port
server.listen(4000, () => console.log("listen on port 4000"));
