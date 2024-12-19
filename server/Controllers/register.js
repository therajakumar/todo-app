import { modeluser } from "../model/usermodel.js";
import bcryptjs from "bcryptjs";
import generatetoken from "../config/generateToken.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("please fill your all details");
    }
    const useremail = await modeluser.findOne({
      email: email,
    });
    if (useremail) {
      return res.status(400).send("email already extis");
    }
    const newuser = new modeluser({
      name: name,
      email: email,
      password: password,
    });

    await newuser.save();

    return res.status(201).json({ token: generatetoken(newuser._id) });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please fill in your details");
    }

    const user = await modeluser.findOne({ email: email });
    if (!user) {
      return res.status(404).send("No user with provided email");
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    const token = generatetoken(user._id);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}
export async function getUserDetails(req, res) {
  try {
    return res.status(200).json({
      userId: req.user._id,
      useremail: req.user.email,
      
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}
