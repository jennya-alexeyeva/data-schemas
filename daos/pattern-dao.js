import patternModel from "../models/pattern-model.js";
export const findAllPatterns = () => patternModel.find();
export const findPatternById = (id) => patternModel.findById(id);
export const createPattern = (pattern) => patternModel.create(pattern);
export const deletePattern = (id) => patternModel.deleteOne({_id: id});
export const updateFavoritedUsers = (id, favoritedUsers) => patternModel.updateOne({_id: id}, {$set: {favoritedUsers: favoritedUsers}});
export const updatePattern = (id, pattern) => patternModel.updateOne({_id: id}, {$set: pattern});