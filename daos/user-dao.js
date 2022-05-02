import userModel from "../models/user-model.js";
export const getAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findById(id);
export const findUserByUsername = (username) => userModel.findOne({username: username});
export const findUserByCredentials = (username, password) => userModel.findOne({username: username, password: password});
export const createAccount = (user) => userModel.create(user);
export const deleteUser = (id) => userModel.deleteOne({_id: id});
export const updateUser = (id, user) => userModel.updateOne({_id: id}, {$set: user});