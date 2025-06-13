import { User } from "../models/UserModel.js";


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile by username
export const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;

    // Check if username/email already exists
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: userId } }, // Exclude current user
        { $or: [{ username }, { email }] }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already in use',
        field: existingUser.username === username ? 'username' : 'email'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      message: error.name === 'ValidationError' 
        ? Object.values(error.errors).map(e => e.message).join(', ')
        : 'Failed to update profile'
    });
  }
};