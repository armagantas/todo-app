const AuthSchema = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await AuthSchema.findOne(email);
    if (user) {
      return res.status(500).json({ msg: "This user already exists" });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ msg: "Your password must be at least 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res.status(500).json({ msg: "Not a valid email address" });
    }

    const newUser = await AuthSchema.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      token,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne(email);

    if (!user) {
      return res.status(500).json({ msg: "User not found" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ msg: "Wrong password!" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

function isEmail(emailAddress) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (emailAddress.match(re)) return true;
  else return false;
}

module.exports = { register, login };
