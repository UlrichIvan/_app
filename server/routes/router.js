const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getData,
  userExists,
  getUser,
  setUser,
  updateUser,
  updateUserConnection,
  getGroupsWhereUsername,
  selectUsersWhereGroupName,
  getMessagesFromGroup,
  getSingleMessageConversationWhere,
} = require("../database/utils");
const {
  validQueryToken,
  dataIsValided,
  validBodyToken,
} = require("../middlewares");

Router.get("/user", dataIsValided, (req, res) => {
  let { username, userpassword } = req;
  getUser({ username, userpassword }).then((user) => {
    if (user) {
      let userdata = { name: username, password: userpassword, isauth: true };
      updateUser({ user: userdata })
        .then((r) => {
          res.json({
            status: 200,
            token: jwt.sign({ username: user.name, isauth: r.saved }, "demo"),
          });
        })
        .catch((err) => console.log(err.message, err));
    } else {
      res.json({ status: 404, token: null });
    }
  });
});

Router.post("/user/create", dataIsValided, async (req, res) => {
  const { username: name, userpassword: password } = req;
  try {
    let { exists, created = false } = await userExists({ name });

    if (exists) return res.status(200).json({ status: 200, exists, created });
    else {
      const { created, exists = false } = await setUser({ name, password });
      return res.status(200).json({ status: 200, created, exists });
    }
  } catch (error) {
    res.status(200).json({ error: true, status: 200 });
  }
});

Router.get("/token", validQueryToken, (req, res) => {
  res.json(req.user);
});

Router.get("/single/messages", validQueryToken, async (req, res) => {
  let data = await getSingleMessageConversationWhere({
    user: { name: req.user.username },
    friend: { name: req.query.name || "" },
  });
  res.json({ data });
});

Router.get("/all-messages", validQueryToken, async (req, res) => {
  try {
    let { name: groupname } = req.query;
    let { username } = req.user;
    let messages = await getMessagesFromGroup({ groupname, username });
    res.json({ messages });
  } catch (error) {
    console.log(error.message, error);
  }
});
Router.get("/users", validQueryToken, async (req, res) => {
  try {
    let users = await getData({ type: "users" });
    users = users
      .map((u, i) => {
        if (u.name !== req.user.username) {
          let { isauth, name } = u;
          return { id: i, isauth, name };
        }
      })
      .filter((u) => u !== undefined);
    // console.log(users)
    res.json({ users });
  } catch (error) {
    res.status(401);
  }
});
Router.put("/disconnect", validBodyToken, async (req, res) => {
  try {
    let { username } = req.user;

    await updateUserConnection({ user: { name: username, isauth: false } });
    res.json({
      isdiconnected: true,
    });
  } catch (error) {
    res.json({
      isdiconnected: false,
    });
    console.log(error.message);
  }
});
Router.get("/users/group", validQueryToken, async (req, res) => {
  try {
    let { username } = req.user;
    let { groupname } = req.query;

    let users = await selectUsersWhereGroupName({ name: groupname, username });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message, error);
  }
});
Router.get("/groups", validQueryToken, async (req, res) => {
  try {
    let { username } = req.user;
    let groups = await getGroupsWhereUsername({ type: "groups", username });
    res.json(groups);
  } catch (error) {
    console.log(error);
  }
});
module.exports = Router;
