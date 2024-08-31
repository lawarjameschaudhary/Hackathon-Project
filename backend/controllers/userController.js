const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// reister the user

const registerUser = async (req,  res) => {
    const { username, email, password, isSeller } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(userExist)  return res.status(400).json({ mesage: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashPasssword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashPasssword,
            isSeller
        });

        res.status(201).json({ message: 'User created', userID: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Something Went wrong. Try Again.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Something Went Wrong. Try Again.' });

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { registerUser, loginUser }