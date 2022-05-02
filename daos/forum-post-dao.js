import forumPostModel from "../models/forum-post-model.js";
export const createForumPost = (post) => forumPostModel.create(post);
export const findAllPosts = () => forumPostModel.find();
export const findPostById = (id) => forumPostModel.findById(id);
export const deletePost = (id) => forumPostModel.deleteOne({_id: id});