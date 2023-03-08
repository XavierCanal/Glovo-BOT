const userService = require("../services/userService");

function getOneUser(id) {  
    if (!id) {
        console.log(`[ERROR] No id provided.`)
        return;
    }
  
    try {
      const user = userService.getUserById(id);
      return user;
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
        return "[ERROR]";
    }
  };
  
  const updateOneUser = (req, res) => {
    const {
      body,
      params: { userName },
    } = req;
  
    if (!userName) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userName' can not be empty" },
      });
    }
  
    try {
      const updatedUser = userService.updateOneUser(userName, body);
      res.send({ status: "OK", data: updatedUser });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const deleteOneUser = (req, res) => {
    const {
      params: { userName },
    } = req;
  
    if (!userName) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':userName' can not be empty" },
      });
    }
  
    try {
      userService.deleteOneUser(userName);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  module.exports = {
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser
  };