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
        // Check if the user is authenticated
        const isAuthenticated = req.user && req.user.isSeller !== undefined;

        if (!isAuthenticated) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find users who are sellers, and populate both the 'username' from the offeredBy and the 'location'
        const users = await User.find({ isSeller: true })
            .populate('service.offeredBy', 'username') 
            .select('service location imageUrl');

        // Flatten the service array while also attaching the location to each service
        const services = users.flatMap(user => 
            user.service.map(service => ({
                ...service.toObject(),
                location: user.location, 
                imageUrl: user.imageUrl 
            }))
        );

        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
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