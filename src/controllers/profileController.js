const User = require('../models/User');

const profileController = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.userId)
                .select('-password');
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = profileController; 