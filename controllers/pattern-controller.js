import * as patternsDao from "../daos/pattern-dao.js";
import * as userDao from "../daos/user-dao.js";

const favoritePattern = async (req, res) => {
  let pattern = req.body.pattern;
  let user = req.body.user;

  pattern = await patternsDao.updateFavoritedUsers(pattern._id, [...pattern.favoritedUsers, user]);
  res.json(pattern);
}

const unfavoritePattern = async (req, res) => {
  let pattern = req.body.pattern;
  let user = req.body.user;

  pattern = await patternsDao.updateFavoritedUsers(pattern._id, pattern.favoritedUsers.filter(pattern => pattern !== user._id));
  res.json(pattern);
}

const findAllPatterns = async (req, res) => {
  const keywords = req.query.keywords;
  let patterns = await patternsDao.findAllPatterns();
  if (keywords) {
    patterns = patterns.filter(pattern => pattern.title.toLowerCase().includes(keywords.toLowerCase())
        || pattern.description.toLowerCase().includes(keywords.toLowerCase()));
  }
  res.json(patterns);
}

const findPatternById = async (req, res) => {
  const patternId = req.params.id;
  const pattern = await patternsDao.findPatternById(patternId);
  res.json(pattern);
}

const createPattern = async (req, res) => {
  const newPattern = req.body;
  console.log(newPattern);
  const authorId = newPattern.author;
  const author = await userDao.findUserById(authorId);
  console.log(author ?? "no author?");
  if (author && author.isMaker) {
    const createdPattern = await patternsDao.createPattern(newPattern);
    res.json(createdPattern);
  } else {
    res.send(403);
  }
}

const deletePattern = async (req, res) => {
  const patternIdToDelete = req.params.id;

  const status = await patternsDao.deletePattern(patternIdToDelete);
  res.send(status);
}

export default (app) => {
  app.post('/api/patterns', createPattern);
  app.get('/api/patterns', findAllPatterns);
  app.get('/api/patterns/:id', findPatternById);
  app.delete('/api/patterns/:id', deletePattern);
  app.post('/api/patterns/favorites', favoritePattern);
  app.post('/api/patterns/unfavorite', unfavoritePattern);
}