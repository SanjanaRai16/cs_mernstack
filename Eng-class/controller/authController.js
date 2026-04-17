import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const registeruser = async (req, res) => {
  try {
     console.log("BODY:", req.body);
    const { name, email, phone, password } = req.body;

    // ✅ VALIDATION (VERY IMPORTANT FOR PRODUCTION)
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required!"
      });
    }

    // ✅ CHECK USER EXISTS
    const userexist = await User.findOne({ email });

    if (userexist) {
      return res.status(400).json({
        success: false,
        message: "User already exists!"
      });
    }

    // ✅ HASH PASSWORD SAFELY
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const userData = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    // ❌ EMAIL TEMPORARILY DISABLED (CAUSE OF YOUR 500 ERROR)
    console.log("User created successfully:", email);

    // (OPTIONAL) JWT TOKEN (you can add later if needed)
    // const token = jwt.sign(
    //   { id: userData._id, name: userData.name },
    //   SECRET_KEY,
    //   { expiresIn: "7d" }
    // );

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: userData
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email!"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res.status(500).json({
        success: false,
        message: "invalid password!"
      })
    }

    //token generate 
    //const token = await jwt.sign({payload}, SECRETKEY, {options})
    // structure of token => header.payload.signature
    // header => metadata about token, payload=> data, 
    // signature=> secret key + header + payload
    const token = await jwt.sign({ id: userExist._id, name: userExist.name }, SECRET_KEY, {expiresIn:'7d'});

    //response.cookie(name, value, {options})
    res.cookie("mycookie",token,{
        httpOnly: true,
        secure:false,
        sameSite:'lax',
        maxAge: 7*24*60*60*1000
    })

    res.status(200).json({
      success: true,
      message: "Login successfull!",
      token: token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to add User!"
    })
  }
}