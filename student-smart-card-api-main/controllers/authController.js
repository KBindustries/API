import User from "../models/userModel.js";
import Specialty from "../models/specialty.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  try {
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      imageUrl: req.body.imageUrl,
      role: req.body.role,
      specialty: req.body.specialty,
    });

    console.log(newUser);

    await newUser.save();
    console.log(newUser);
    let responseData = {
      success: true,
      message: "Successfully Created",
      data: newUser,
    };

    if (newUser.role === "delegate") {
      // Retrieve specialty name and fee
      const specialty = await Specialty.findById(newUser.specialty);
      if (specialty) {
        responseData = {
          ...responseData,
          specialty: specialty,
        };
      }
    }

    res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
      error: err,
    });
  }
};

// user login
export const login = async (req, res) => {
  console.log("===", req);
  User.findOne({
    email: req.body.email,
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }
    const getUser = await User.findById(user._id).populate({
      path: "specialty",
      select: "name level total_fee  fee_check",
      strictPopulate: false,
    });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(passwordIsValid);

    console.log(user.password, req.body.password);

    // if (!passwordIsValid) {
    //   return res.status(401).send({
    //     accessToken: null,
    //     message: "Invalid Password!",
    //   });
    // }

    var token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        specialty: user.specialty,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).json({
      status: true,
      accessToken: token,
      user: getUser,
    });
  });
};

//get all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "specialty",
      select: "name level total_fee  fee_check",
      strictPopulate: false,
    });
    res.status(200).json({
      success: true,
      message: "succesful",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getSingle user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully searched",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
