import User from "../models/User.js";
import jwtIssuer from "../helpers/jwtIssuer.js";
import bcrypt from "bcrypt";
import generateRobohashAvatar from "../helpers/avatar.js";

export const allUser = async (req, res) => {
  try {
    const userList = await User.find();
    res
      .status(200)
      .json({ message: "Get request successful 😄", createList: userList });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Get request failed 😠", error: error });
  }
};

const getHash = async (password) => {
  let hash;

  await bcrypt.hash(password, 10).then((response) => (hash = response));

  return hash;
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const registerUser = async (req, res) => {
  const { userName, firstName, lastName, password, messages } = req.body;

  const ip = req.ip;
  const avatar = generateRobohashAvatar();

  const hash = await getHash(password);

  try {
    const newUserName = await User.findOne({ userName: userName });

    if (newUserName) {
      return res.status(400).json({ message: "username already exist" });
    }

    const resultUser = await User.create({
      userName,
      firstName,
      lastName,
      avatar,
      ip,
      hash,
      messages,
    });

    return res
      .status(200)
      .json({ message: "User was created", createdUser: resultUser });
  } catch (error) {
    return res.status(400).json({ message: "Error happened 😞", error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
  const { userName, password } = req.body;

  //   const hash = await getHash(password);

  try {
    if (!password) {
      return res.status(400).json({ message: "No password supplied" });
    }

    const user = await User.findOne({ userName: userName });

    if (user === null) {
      return res.status(400).json({ message: "No user found" });
    }

    const checkPassword = await bcrypt.compare(password, user.hash);

    if (checkPassword) {
      console.log("You are authenticated 🕺");
      const token = await jwtIssuer.generateToken(user);

      // with token
      // return res.status(200).json({ message: "Login Successful!", user: user, token: token });

      // with cookie
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({
          message: "Login successful",
        });
    } else {
      return res.status(400).json({ message: "Passwords not matching" });
    }
  } catch (error) {
    return res.status(400).json({ message: "General error upon signing in." });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const logout = async (req, res) => {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "You are logged out." });
};

/**
 * Controller method to get the user profile
 * @param {*} req
 * @param {*} res
 */
export const getProfile = async (req, res) => {
  return res.status(200).json({ profile: req.user });
};

export default { allUser, registerUser, login, logout, getProfile };
