import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';
import { AuditLog } from '../models/AuditLogModel.js'; 
import mongoose from 'mongoose';

export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashedPassword,
      role: role || 'clerk',
    });
    await user.save();

    // Create audit log
    const auditLog = new AuditLog({
      action: 'User Created',
      documentID: user._id.toString(),
      user: username,
      status: 'Completed'
    });
    await auditLog.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { user: { id: user._id, email: user.email, username: user.username, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { user: { id: user._id } },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.json({ message: 'Logged out successfully' });
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = jwt.sign(
      { user: { id: user._id, email: user.email, username: user.username, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: 'Token refreshed' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};