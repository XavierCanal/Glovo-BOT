const DB = require("../data/db.json")
const { saveToDatabase } = require("../data/utils");

function createNewUser(newUser) {
    try {
      const isAlreadyAdded =
        DB.users.findIndex((user) => user.id === newUser.id) > -1;
  
      if (isAlreadyAdded) {
        return "[WARNING] User with this account already exists";
      }
  
      DB.users.push(newUser);
      saveToDatabase(DB);
  
      return "[SUCCESS] User created!";
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };

  function getUserById(id) {
    try {
      const user = DB.users.find((user) => user.id === id);
  
      if (!user) {
        return "[WARNING] Can't find an account liked with this user. use -> `!start-register` to get the steps in order to register.";
      }
  
      return "**User found!**"
      + "\n  - username: *"+ user.username 
      + "*\n  - id: " +user.id.slice(0, -7) + "XXXXXXXX" 
      + "\n  - fullname: *"+ user.fullName +"*";
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };

  const deleteOneUser = (id) => {
    try {
      const indexForDeletion = DB.users.findIndex(
        (users) => users.id === id
      );
      if (indexForDeletion === -1) {
        return "[WARNING] Can't find an account linked with this user.";
      }
      DB.users.splice(indexForDeletion, 1);
      saveToDatabase(DB);
      return "[SUCCESS] User deleted!";
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };

  function addCoords (userC, lat, long) {
    try {
      const indexForUpdate = DB.users.findIndex(
        (user) => user.id === userC.id
      );
  
      if (indexForUpdate === -1) {
        return "[WARNING] Can't find user with this id.";
      }
      userC.lat = lat;
      userC.long = long;
  
      DB.users[indexForUpdate] = userC;
      saveToDatabase(DB);
  
      return "[SUCCESS] User coords updated!";
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };

  class User {
    constructor(username, id, fullName) {
      this.username = username;
      this.id = id
      this.fullName = fullName;
    }
  }

module.exports = {
    createNewUser,
    getUserById,
    deleteOneUser,
    addCoords,
    User
  };
  