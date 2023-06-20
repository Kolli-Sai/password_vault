const registerUser = async (req, res) => {
  try {
    res.send("registerUser route");
  } catch (error) {
    res.send("error in registerUser");
  }
};
const loginUser = async (req, res) => {
  try {
    res.send("loginUser route");
  } catch (error) {
    res.send("error in loginUser");
  }
};
const logoutUser = async (req, res) => {
  try {
    res.send("logoutUser route");
  } catch (error) {
    res.send("error in logoutUser");
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
