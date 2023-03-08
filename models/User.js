const DB = require("../data/db.json")
const { saveToDatabase } = require("../data/utils");

function createNewUser(newUser) {
    try {
      const isAlreadyAdded =
        DB.users.findIndex((user) => user.id === newUser.id) > -1;
  
      if (isAlreadyAdded) {
        return "[ERROR] User with this account already exists";
      }
  
      DB.users.push(newUser);
      saveToDatabase(DB);
  
      return "[SUCCESS] User created!";
    } catch (error) {
      throw { status: 500, message: error?.message || error };
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
    User
  };
  