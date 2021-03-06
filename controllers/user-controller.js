import * as userDao from "../daos/user-dao.js";

const findAllUsers = async (req, res) => {
  const users = await userDao.getAllUsers();
  res.json(users);
}

const findUserById = async (req, res) => {
  const id = req.params.id;
  let user = await userDao.findUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.json({});
  }
}

const updateUser = async (req, res) => {
  const userIdToUpdate = req.params.id;
  const updatedUser = req.body;
  const existingUser = await userDao.findUserById(userIdToUpdate);

  //user wants to change username
  if (existingUser.username !== updatedUser.username) {
    let existingUserWithNewUsername = await userDao.findUserByUsername(updatedUser.username);
    if (existingUserWithNewUsername) {
      res.send(409);
      return;
    }
  }

  try {
    const response = await userDao.updateUser(userIdToUpdate, updatedUser);
    res.send(response);
  } catch (e) {
    res.send(e.errorCode);
  }
}

export default (app) => {
  app.get('/api/users/:id', findUserById);
  app.put('/api/users/:id', updateUser);
  app.get('/api/users', findAllUsers);
}