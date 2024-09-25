import sendWelcomeEmail from "../mail/welcomemail.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All Fields are Required'
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // await sendWelcomeEmail(fullname)

    return res.status(201).json({
      success: true,
      message: 'User Registered Successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const login = async (req, res) => {
  const { userIdentifier, type, password } = req.body;

  if (!userIdentifier || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required',
    });
  }

  try {
    let validUser;

    if (type === 'email') {
      validUser = await User.findOne({ email: userIdentifier });
    } else {
      validUser = await User.findOne({ username: userIdentifier });
    }

    if (!validUser) {
      return res.status(401).json({
        success: false,
        message: 'User does not exist',
      });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const { password: hashedPassword, ...userData } = validUser._doc;

    const tokenExpiry = 3600 * 1000;

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: tokenExpiry,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
      token,
      expiresAt: Date.now() + tokenExpiry,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({
    success: true,
    message: 'Successfully Logged Out'
  })
}

export const google = async (req, res) => {
  const { username, email } = req.body;
  try {
    if (!email || !username) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required',
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = user._doc;

      const tokenExpiry = 3600 * 1000;

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: tokenExpiry,
      });

      return res.status(200).json({
        success: true,
        message: 'Login Successful',
        user: userData,
        token,
        expiresAt: Date.now() + tokenExpiry,
      });
    } else {
      const generatedPassword = [...Array(16)]
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        fullname: username,
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = newUser._doc;

      const tokenExpiry = 3600 * 1000;

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: tokenExpiry,
      });

      return res.status(201).json({
        success: true,
        message: 'Signup Successful',
        user: userData,
        token,
        expiresAt: Date.now() + tokenExpiry,
      });
    }
  } catch (error) {
    console.error('Error in Google auth:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const github = async (req, res) => {
  const { username, email } = req.body;
  try {
    if (!email || !username) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required',
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = user._doc;

      const tokenExpiry = 3600 * 1000;

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: tokenExpiry,
      });

      return res.status(200).json({
        success: true,
        message: 'Login Successful',
        user: userData,
        token,
        expiresAt: Date.now() + tokenExpiry,
      });
    } else {
      const generatedPassword = [...Array(16)]
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        fullname: username,
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = newUser._doc;

      const tokenExpiry = 3600 * 1000;

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: tokenExpiry,
      });

      return res.status(201).json({
        success: true,
        message: 'Signup Successful',
        user: userData,
        token,
        expiresAt: Date.now() + tokenExpiry,
      });
    }
  } catch (error) {
    console.error('Error in Google auth:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

