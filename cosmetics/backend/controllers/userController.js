const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },  
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
};
