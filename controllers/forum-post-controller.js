import * as forumPostDao from "../daos/forum-post-dao.js";

const createPost = async (req, res) => {
  const newPost = req.body;
  const createdPost = await forumPostDao.createForumPost(newPost);
  res.json(createdPost);
}

const findAllPosts = async (req, res) => {
  const posts = await forumPostDao.findAllPosts();
  res.json(posts);
}

const deletePost = async (req, res) => {
  const postIdToDelete = req.params.id;
  const caller = req.params.caller;
  const post = await forumPostDao.findPostById(postIdToDelete);
  if (post.author.username === caller) {
    const status = await forumPostDao.deletePost(postIdToDelete);
    res.send(status);
  } else {
    res.send(403);
  }
}

export default (app) => {
  app.post('/api/forum', createPost);
  app.get('/api/forum', findAllPosts);
  app.delete('/api/forum/:id', deletePost);
}