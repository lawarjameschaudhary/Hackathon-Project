const User = require('../models/User');

// create a service
 const createService = async (req, res) => {
    const {serviceName, description,  toleName, ward, city, state} = req.body;

    try {
        const user = await User.findById(req.user.id);

        if(!user) return res.status(404).json({ message: 'Something Went Wrong.' });

        user.service.push({serviceName, description, offeredBy: req.user.id});

        user.location = {toleName, ward, city, state};

        user.isSeller = true;

        await user.save();

        res.status(200).json({ message: 'User updated to seller', user});

    } catch (error) {
        
    }
 };


 // get all services
 const getAllServices = async (req, res) => {
    try {
        const users = await User.find({ 'isSeller': true }).populate('service.offeredBy', 'username');
        const services = users.flatMap(user => user.service);
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



// Get service by ID
const getServiceById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('service.offeredBy', 'username');
        if (!user || !user.service.length) return res.status(404).json({ message: 'Service not found' });

        const service = user.service.find(service => service._id.toString() === req.params.serviceId);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createService, getAllServices, getServiceById };