const DB = require("../data/db.json");
const { saveToDatabase } = require("../data/utils");

const createNewUser = (newUser) => {
    try {
      const isAlreadyAdded =
        DB.users.findIndex((user) => user.id === newUser.id) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `User with the id '${user.id}' already exists`,
        };
      }
  
      DB.users.push(newUser);
      saveToDatabase(DB);
  
      return newUser;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };

  
module.exports = {
    createNewUser,
  };
  