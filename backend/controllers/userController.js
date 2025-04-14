import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const role=user.role;
    const token = createToken(user._id);
    return res.json({ success: true, token,role });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  
  }
};

// Create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(req.body);
  try {
    // checking user is already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const role=user.role;
    const token = createToken(user._id);
    return res.json({ success: true, token, role});
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const addressList= async (req,res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let addresses = userData.addresses;
    return res.json({ success: true, addresses: addresses });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

const saveAddress= async (req,res)=>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let addresses = userData.addresses;
    const newAddress=req.body.newAddress;
    addresses.push(newAddress);
    await userModel.findByIdAndUpdate(req.body.userId, { addresses });
    return res.json({ success: true, message: "Added to address" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

export { loginUser, registerUser,addressList,saveAddress };
