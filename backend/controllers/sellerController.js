const User = require('../models/User');

const updateUserToSeller = async (req, res) => {
    const { serviceName, description, toleName, ward, city, state } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Push new service to the services array
        user.service.push({ serviceName, description, offeredBy: req.user.id });

        // Update the location
        user.location = { toleName, ward, city, state };

        // Mark user as a seller
        user.isSeller = true;

        // Save the updated user to the database
        await user.save();

        // Return success response
        res.status(200).json({ message: 'User updated to seller', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { updateUserToSeller };
