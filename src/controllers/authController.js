const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "SDSFDGDfdghfyhfjgghjgjyiy";

const authController = {
    signup: async (req, res) => {
        try {
            const { email, password, firstName, lastName, phone } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone
            });

            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    logout: async (req, res) => {
        res.json({ message: 'Logged out successfully' });
    }
};

module.exports = authController; 