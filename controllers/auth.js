const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const logger = require('../logger');

exports.register = async (req, res) => {
  const { firstname, lastname, phone, address, email, password } = req.body;

  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.PASS_SEC
  ).toString();

  const newUser = new User({
    firstname,
    lastname,
    phone,
    address,
    email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { firstname, password } = req.body;

  try {
    const user = await User.findOne({ firstname });

    if (!user) {
      return res.status(401).json("Wrong firstname or password");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json("Wrong firstname or password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password: userPassword, ...userWithoutPassword } = user._doc;

    res.status(200).json({ ...userWithoutPassword, accessToken });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
};
