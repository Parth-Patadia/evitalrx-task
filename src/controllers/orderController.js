const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const orderController = {
    createOrder: async (req, res) => {
        try {
            // Get cart items
            const cart = await Cart.findOne({ userId: req.user.userId })
                .populate('items.productId');
            
            if (!cart || cart.items.length === 0) {
                throw new Error('Cart is empty');
            }
            
            // Calculate total amount and prepare order items
            let totalAmount = 0;
            const orderItems = cart.items.map(item => {
                const subtotal = item.productId.price * item.quantity;
                totalAmount += subtotal;
                
                return {
                    productId: item.productId._id,
                    quantity: item.quantity,
                    unitPrice: item.productId.price
                };
            });
            
            // Create order
            const order = new Order({
                userId: req.user.userId,
                items: orderItems,
                totalAmount
            });
            
            // Update product stock
            for (const item of cart.items) {
                await Product.findByIdAndUpdate(item.productId._id, {
                    $inc: { stockQuantity: -item.quantity }
                });
            }
            
            // Save order and clear cart
            await order.save();
            await Cart.findByIdAndDelete(cart._id);
            
            res.status(201).json({
                orderId: order._id,
                message: 'Order placed successfully'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserOrders: async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user.userId })
                .populate('items.productId');
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOrder: async (req, res) => {
        try {
            const order = await Order.findOne({
                _id: req.params.orderId,
                userId: req.user.userId
            }).populate('items.productId');
            
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(
                req.params.orderId,
                { status },
                { new: true }
            );
            
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = orderController; 