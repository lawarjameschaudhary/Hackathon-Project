const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// admin register
const adminRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPasssword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            username,
            email,
            password: hashPasssword,
        });
        res.status(201).json({ message: "Admin created", userID: admin._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) { 
            return res.status(400).json({ message: "Invalid email or password" });
        }
     const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ token });
    } catch (error) {   
        res.status(500).json({ message: "Server error" });
    }
};

// aprove seller
const approveSeller = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isSeller = true;
        user.approvedByAdmin = true;
        await user.save();
        res.status(200).json({ message: 'User approved' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// decline

const declineSeller = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isSeller = false;
        user.approvedByAdmin = false;
        await user.save();
        res.status(200).json({ message: 'User declined' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// get seller who applied for seller

const getSellersApplication = async (req, res) => {
    try {
        const users = await User.find({ appliedForSeller: true, approvedByAdmin: false }).select('username email isSeller location phoneNo service imageUrl');
        if (users.length === 0) return res.status(404).json({ message: 'No Current Applications' });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { approveSeller, declineSeller, adminLogin, adminRegister, getSellersApplication };