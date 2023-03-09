const fs = require("fs");
const path = require("path");
const getData = ({ type }) => {
  return new Promise((resolve, reject) => {
    let readStream = fs.createReadStream(
      path.join(path.dirname(__dirname), "data.json")
    );
    let data = "";

    readStream.on("data", (chunk) => {
      data += chunk.toString("utf-8");
    });

    readStream.on("error", () => {
      reject(null);
    });

    readStream.on("end", () => {
      data = JSON.parse(data);
      resolve(type == "*" ? data : data[type]);
    });
  });
};
const getMessagesFromGroup = async ({ groupname, username }) => {
  try {
    let groups = await getData({ type: "groups" });
    let privategroup = groups.filter((group) => {
      let { users, name } = group;
      return users.includes(username) && name === groupname;
    });
    return privategroup[0] ? privategroup[0]["messages"] : [];
  } catch (err) {
    console.log(err.message, err);
  }
};
const saveSingleMessage = async (data) => {
  try {
    let singlesMessages = await getData({ type: "singles" });
    if (singlesMessages) {
      data["message"]["at"] = new Date().toLocaleDateString("fr-Fr", {
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      let { sender, receiver, message } = data;
      singlesMessages.push({ sender, receiver, message });
      let res = await setData({ type: "singles", userdata: singlesMessages });
      return {
        res,
        data: {
          sender,
          receiver,
          message,
        },
      };
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
const getSingleMessageConversationWhere = async ({ user, friend }) => {
  try {
    let data = await getData({ type: "singles" });
    if (data) {
      let sms = data.filter(
        (d) =>
          (d.sender === user.name && d.receiver === friend.name) ||
          (d.sender === friend.name && d.receiver === user.name)
      );
      return sms;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err.message);
  }
};
const updateGroupMessages = async ({ groupname, username, message, type }) => {
  try {
    let groups = await getData({ type: "groups" });
    let index = groups.findIndex((g) => g.name === groupname);

    if (index !== -1) {
      let newmessage = {
        sender: username,
        type,
        message,
        at: new Date().toLocaleDateString("fr-Fr", {
          day: "numeric",
          month: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };

      groups[index]["messages"].push(newmessage);

      let res = await setData({ type: "groups", userdata: groups });
      if (res.saved) return { data: newmessage };
    } else return null;
  } catch (error) {
    console.log(error.message, error);
  }
};
const getGroupsWhereUsername = async ({ type, username = "" }) => {
  try {
    let groups = await getData({ type });
    let privateGroups = groups.filter((group) => {
      let { users } = group;
      return users.includes(username);
    });
    return privateGroups ? privateGroups : [];
  } catch (err) {
    console.log(err.message, err);
  }
};
const selectUsersWhereGroupName = async ({ name }) => {
  try {
    let groups = await getData({ type: "groups" });
    let group = groups.find((group) => {
      return group.name === name;
    });

    return group ? group["users"] : [];
  } catch (err) {
    console.log(err.message, err);
  }
};
const updateUser = async ({ user }) => {
  try {
    let data = await getData({ type: "users" });
    let users = data.map((el) => {
      if (user.name === el.name) {
        return user;
      } else return el;
    });
    let result = await setData({ type: "users", userdata: users });
    return result;
  } catch (error) {
    console.log(error.message, error);
  }
};
const updateUserConnection = async ({ user }) => {
  try {
    let data = await getData({ type: "users" });
    let users = data.map((el) => {
      if (user.name === el.name) {
        el.isauth = user.isauth;
        return el;
      } else return el;
    });
    let result = await setData({ type: "users", userdata: users });
    return result;
  } catch (error) {
    console.log(error.message, error);
  }
};
const setData = ({ type, userdata }) => {
  return new Promise((resolve, reject) => {
    getData({ type: "*" })
      .then((data) => {
        let writeStream = fs.createWriteStream(
          path.join(path.dirname(__dirname), "data.json")
        );
        data[type] = userdata;
        writeStream.write(JSON.stringify(data), (err) => {
          if (err) reject(err);
          else resolve({ saved: true });
        });
        writeStream.on("error", () => reject({ save: false }));
      })
      .catch((err) => reject(err));
  });
};
const addData = ({ type, userdata }) => {
  return new Promise((resolve, reject) => {
    getData({ type: "*" })
      .then((data) => {
        let writeStream = fs.createWriteStream(
          path.join(path.dirname(__dirname), "data.json")
        );
        data[type].push(userdata);
        writeStream.write(JSON.stringify(data), (err) => {
          if (err) reject(err);
          else resolve({ saved: true });
        });
        writeStream.on("error", () => reject({ save: false }));
      })
      .catch((err) => reject(err));
  });
};
const getUser = (user) => {
  return new Promise((resolve, reject) => {
    getData({ type: "users" })
      .then((users) => {
        let { username, userpassword } = user;
        let data = users.filter(
          ({ name, password }) => name == username && userpassword == password
        );
        if (data.length) resolve(data[0]);
        else resolve(null);
      })
      .catch((err) => reject(err.message));
  });
};
const userExists = (user) => {
  return new Promise((resolve, reject) => {
    getData({ type: "users" })
      .then((users) => {
        let data = users.filter((u) => u.name == user.name);
        if (data.length) resolve({ exists: true });
        else resolve({ exists: false });
      })
      .catch((err) => reject(err.message));
  });
};
const setUser = (user) => {
  return new Promise((resolve, reject) => {
    getData({ type: "*" })
      .then((data) => {
        const userdata = {
          id: data["users"].length + 1,
          ...user,
          isauth: false,
        };
        addData({ type: "users", userdata })
          .then(({ saved }) => {
            resolve({ created: saved });
          })
          .catch((err) => reject(err.message));
      })
      .catch((err) => reject(err.message));
  });
};
const saveMessages = (messages) => {
  return new Promise((resolve, reject) => {
    setData({ type: "messages", userdata: messages })
      .then((results) => {
        resolve({ results });
      })
      .catch((err) => reject(err));
  });
};
const updateUserMessages = ({ username, type, message }) => {
  return new Promise((resolve, reject) => {
    getData({ type: "messages" })
      .then((data) => {
        let newmessage = {
          sender: username,
          type,
          message,
          at: new Date().toLocaleDateString("fr-Fr", {
            day: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
        };
        let userdata = [...data, newmessage];

        saveMessages(userdata)
          .then(() => {
            resolve({
              status: 200,
              data: newmessage,
            });
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  saveSingleMessage,
  getSingleMessageConversationWhere,
  updateGroupMessages,
  getMessagesFromGroup,
  selectUsersWhereGroupName,
  getData,
  setData,
  userExists,
  setUser,
  updateUserMessages,
  getUser,
  updateUser,
  updateUserConnection,
  getGroupsWhereUsername,
};
