// import User from '../models/user.js';

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = "sarathPlacementSecret123!";


// // @route   POST /api/auth/register
// export const register = async (req, res) => {
//   try {
//     const { email, password, name, department, graduationYear } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       name,
//       department,
//       graduationYear,
//       isVerified: false,
//     });

//     await newUser.save();

//     // Generate token
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     res.status(201).json({
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         name: newUser.name,
//       },
//     });
//   } catch (err) {
//     console.error('Register error:', err); // 🧠 LOG ERROR
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// // @route   POST /api/auth/login
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!JWT_SECRET) {
//       throw new Error('JWT_SECRET is not defined');
//     }

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     res.status(200).json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         department: user.department,
//         graduationYear: user.graduationYear
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// // @route   GET /api/auth/profile
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password');
//     if (!user) return res.status(404).json({ msg: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "sarathPlacementSecret123!";

// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, password, name, department, graduationYear } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      department,
      graduationYear,
      isVerified: false,
    });

    await newUser.save();

    // Generate token (use userId consistently)
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        department: user.department,
        graduationYear: user.graduationYear
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
