const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ 
      name: name || "Unknown",  // Eğer name gelmezse, "Unknown" olarak kaydedilecek.
      email, 
      password: hashedPassword 
    });
    
    await newUser.save();
    res.status(201).json({ message: "Kullanıcı başarıyla kayıt oldu!" });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login };
