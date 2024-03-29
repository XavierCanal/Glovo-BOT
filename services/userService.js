const User = require("../models/User");

const getUserById = (userId) => {
    try {
      return User.getUserById(userId);
    } catch (error) {
      throw error;
    }
  };

const getLatLong = (userId) => {
    try {
      return User.getLatLongFromUserId(userId);
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

  const deleteOneUser = (userId) => {
    try {
      return User.deleteOneUser(userId);
    } catch (error) {
      throw error;
    }
  };

  function addCoords (user, lat, long) {
    try {
      return User.addCoords(user, lat, long);
    } catch (error) {
      throw error;
    }
  };

  function updateCity (user, city) {
    try {
      return User.updateCity(user, city);
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    getUserById,
    createNewUser,
    deleteOneUser,
    addCoords,
    getLatLong,
    updateCity
  };