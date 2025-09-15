import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password, userType } = req.body;

  // Basic input validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields: firstName, lastName, email, and password are required.' });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Validate password strength (example: minimum length)
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  // Define valid user types
  const validUserTypes = ['passenger', 'driver', 'operator', 'admin'];
  const finalUserType = userType || 'passenger';
  if (!validUserTypes.includes(finalUserType)) {
    return res.status(400).json({ message: 'Invalid user type provided.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      userType: finalUserType,
      createdAt: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: 'Account created successfully!' });
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Signup error:', error);
    res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In a real app, you would generate a JWT token here
    res.status(200).json({ message: 'Login successful', user: { email: user.email, userType: user.userType } });
  } catch (error: any) {
    // Log the full error for debugging
    console.error('Login error:', error);
    res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
  }
};