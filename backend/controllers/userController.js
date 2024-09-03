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


// logout user

const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ message: 'User not found' });
        user.token = null;
        await user.save();
        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// update profile:

const updateProfile = async (req, res) => {
    // handel image upload here inside controller
    try {
        const userID = req.user.id;

        if(!req.file){
            return res.status(400).json({ message: 'Please upload an image' });
        };

        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            userID, 
            {
                imageUrl: imageUrl
            }
        );

        res.status(200).json({ message: 'Profile updated', user });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        
    }
};

// Get the user's profile image
const getUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user authentication

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user does not have an imageUrl, you can set a default image URL or an empty string
        const imageUrl = user.imageUrl || 'https://www.istockphoto.com/photos/user-profile'; // Replace with a valid URL for a default image

        res.status(200).json({
            message: 'User retrieved successfully',
            username: user.username,
            email: user.email,
            imageUrl: imageUrl,
            phoneNo: user.phoneNo || 'Not provided',
            location: {
                city: user.location.city || 'Not provided',
                state: user.location.state || 'Not provided',}
            
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve user',
            error: error.message,
        });
    }
};



module.exports = { registerUser, loginUser, logoutUser, updateProfile, getUser }