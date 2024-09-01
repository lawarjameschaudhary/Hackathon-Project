const User = require('../models/User');

const updateUserToSeller = async (req, res) => {
    const { serviceName, description, toleName, ward, city, state } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.service.push({ serviceName, description, offeredBy: req.user.id });


        user.location = { toleName, ward, city, state };

        user.isSeller = true;

        await user.save();

        res.status(200).json({ message: 'User updated to seller', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { updateUserToSeller };
