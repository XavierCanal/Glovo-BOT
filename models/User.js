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
      if(user.city) city = "\n  - city: "+ user.city;

      return user;
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };

  function getLatLongFromUserId(id) {
    try {
      const user = DB.users.find((user) => user.id === id);
  
      if (!user) {
        return "[ERROR] Can't find an account liked with this user.";
      }
  
      return user;
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
      userC.fullName = DB.users[indexForUpdate].fullName;
      DB.users[indexForUpdate] = userC;
      saveToDatabase(DB);
  
      return "[SUCCESS] User coords saved!";
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  };

  function updateCity (userC, city) {
    try {
      console.log("User updateCity: ", userC)
      const indexForUpdate = DB.users.findIndex(
        (user) => user.id === userC.id
      );
  
      if (indexForUpdate === -1) {
        return "[WARNING] Can't find user with this id.";
      }
      userC.city = city;
      userC.fullName = DB.users[indexForUpdate].fullName;
      DB.users[indexForUpdate] = userC;
      saveToDatabase(DB);
  
      return "[SUCCESS] User city updated!";
    } catch (error) {
      return "[ERROR]: " + error.message;
    }
  }

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
    getLatLongFromUserId,
    User,
    updateCity
  };
  