import * as userDao from "../daos/user-dao.js";

const signup = async (req, res) => {
  const credentials = req.body;
  const existingUser = await userDao.findUserByUsername(credentials.username);
  if (existingUser) {
    res.send(403);
  } else {
    req.session['currentUser'] = await userDao.createAccount(credentials);
    res.send(req.session['currentUser']);
  }
}

const login = async (req, res) => {
  const credentials = req.body;
  let profile = await userDao.findUserByCredentials(credentials.username, credentials.password);
  if (profile) {
      req.session['currentUser'] = profile;
      res.send(req.session['currentUser']);
  } else {
      res.send(403);
  }
}

const profile = (req, res) => {
  const profile = req.session['currentUser'];
  if (profile) {
    res.json(profile);
  } else {
    res.send(403);
  }
}

const logout = (req, res) => {
  req.session.destroy();
  res.send(200);
}

const updateProfile = (req, res) => {
  const profile = req.body;
  req.session['currentUser'] = profile;
  res.send(profile);
}

export default (app) => {
  app.post('/api/signup', signup);
  app.post('/api/profile', profile);
  app.post('/api/signin', login);
  app.post('/api/logout', logout);
  app.post('/api/updateProfile', updateProfile);
}