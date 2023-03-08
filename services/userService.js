const User = require("../models/User");

const getUserById = (userName) => {
    try {
      const user = User.getUserForName(userName);
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  const createNewUser = (newUser) => {
    try {
        return User.createNewUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    getUserById,
    createNewUser
  };