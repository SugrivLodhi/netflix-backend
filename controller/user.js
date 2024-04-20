import UserModel from "../model/user.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.json({
        message: "Invalid data",
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "User already Exist",
      });
    }
    const hashpassword = await bcrypt.hash(password, 16);
    await UserModel.create({ fullName, email, password: hashpassword });
    return res.json({
      message: "User created successfully",
    });
  } catch (err) {
    return res.json({
      message: "Somthing went wrong",
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "User is not register",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.json({
        message: "Invalid Data",
      });
    }
    return res.json({
      message: "User login Successfully",
    });
  } catch (err) {
    return res.json({
      message: "Somthing went wrong",
    });
  }
};
