const createPassword = async (req, res) => {
  try {
    res.status(201).send("createPassword route");
  } catch (error) {
    res.send("error in createPassword route");
  }
};
const getAllPasswords = async (req, res) => {
  try {
    res.status(201).send("getAllPasswords route");
  } catch (error) {
    res.send("error in getAllPasswords route");
  }
};
const getPassword = async (req, res) => {
  try {
    res.status(201).send("getPassword route");
  } catch (error) {
    res.send("error in getPassword route");
  }
};
const updatePassword = async (req, res) => {
  try {
    res.status(201).send("updatePassword route");
  } catch (error) {
    res.send("error in updatePassword route");
  }
};
const deletePassword = async (req, res) => {
  try {
    res.status(201).send("deletePassword route");
  } catch (error) {
    res.send("error in deletePassword route");
  }
};

module.exports = {
  createPassword,
  getAllPasswords,
  getPassword,
  updatePassword,
  deletePassword,
};
