const Cart = require('../models/Cart');

const cartController = {
    addToCart: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            
            let cart = await Cart.findOne({ userId: req.user.userId });
            
            if (!cart) {
                cart = new Cart({
                    userId: req.user.userId,
                    items: [{ productId, quantity }]
                });
            } else {
                const itemIndex = cart.items.findIndex(item => 
                    item.productId.toString() === productId
                );

                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    cart.items.push({ productId, quantity });
                }
            }
            
            await cart.save();
            res.status(201).json({ message: 'Product added to cart' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.user.userId })
                .populate('items.productId');
            res.json(cart || { items: [] });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = cartController; 