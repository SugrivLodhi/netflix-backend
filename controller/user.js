import UserModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(200).json({
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
        message: "Invalid Data",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.json({
        message: "Invalid Data",
      });
    }
    const secretKey="sugriv@1997"
    const data ={
      email:user.email
    }
    const token = jwt.sign(data,secretKey)
    return res.status(200).cookie("token",token).json({
      message: `Welcom ${user.fullName}`,
      data:{userName : user.fullName}
    });
  } catch (err) {
    return res.json({
      message: "Somthing went wrong",
    });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the "token" cookie
    res.clearCookie("token");
    // Send a JSON response indicating successful logout
    return res.status(200).json({
      message: "Logout Successfully"
    });
  } catch (error) {
    // If an error occurs, handle it gracefully
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Logout Failed"
    });
  }
};
