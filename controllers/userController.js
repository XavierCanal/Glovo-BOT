const userService = require("../services/userService");

function getOneUser(id) {  
    if (!id) {
        console.log(`[ERROR] No id provided.`)
        return;
    }
  
    try {
      return userService.getUserById(id);
    } catch (error) {
        console.log(`[ERROR]:.`+ error?.message || error);
    }
  };

  function getLatLong(id) {  
    if (!id) {
        console.log(`[ERROR] No id provided.`)
        return;
    }
  
    try {
      return userService.getLatLong(id);
    } catch (error) {
        console.log(`[ERROR]:.`+ error?.message || error);
    }
  };
  
  function createNewUser(newUser) {
    if (
      !newUser.username ||
      !newUser.id ||
      !newUser.fullName
    ) {
        console.log(`[ERROR] One of the following keys is missing or is empty in request body: 'name', 'id','fullName'`)
        return "[ERROR] Some or all parameters are empty";
    }
    
    try {
      return userService.createNewUser(newUser);
    } catch (error) {
        return "[ERROR]: " + error.message;
    }
  };
  
  function deleteOneUser(userId) {
    if (!userId) {
      console.log(`[ERROR] No id provided.`)
        return;
    }
  
    try {
      return userService.deleteOneUser(userId);
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };
  function addCoords(user, lat, long) {
  
    if (!user || !lat || !long) {
      console.log(`[ERROR] One of the following keys is missing or is empty in request body: 'user', 'lat','long'`)
      return "[ERROR] Some or all parameters are empty";
    }
  
    try {
      return userService.addCoords(user, lat, long);
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };
  
  module.exports = {
    getOneUser,
    createNewUser,
    deleteOneUser,
    addCoords,
    getLatLong
  };