const Order = require('../models/Order');
const Product = require('../models/Product');

const analyticsController = {
    // 1. Find second highest order value
    getSecondHighestOrder: async (req, res) => {
        try {
            const result = await Order.aggregate([
                { $sort: { totalAmount: -1 } },
                { $skip: 1 },
                { $limit: 1 }
            ]);

            res.json(result[0] || { message: 'No orders found' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 2. Monthly Orders analysis for 2023
    getMonthlyAnalysis2023: async (req, res) => {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date('2023-01-01'),
                            $lt: new Date('2024-01-01')
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: '$createdAt' },
                        totalOrders: { $sum: 1 },
                        totalRevenue: { $sum: '$totalAmount' },
                        averageOrderValue: { $avg: '$totalAmount' }
                    }
                },
                {
                    $sort: { _id: 1 }
                },
                {
                    $project: {
                        month: '$_id',
                        totalOrders: 1,
                        totalRevenue: { $round: ['$totalRevenue', 2] },
                        averageOrderValue: { $round: ['$averageOrderValue', 2] },
                        _id: 0
                    }
                }
            ]);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 3. Products sold less than 3 times or not sold in last quarter 2023
    getLowSellingProducts: async (req, res) => {
        try {
            const result = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date('2023-10-01'),
                            $lt: new Date('2024-01-01')
                        }
                    }
                },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.productId',
                        timesSold: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                { $unwind: '$product' },
                {
                    $match: {
                        timesSold: { $lt: 3 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        productName: '$product.name',
                        productId: '$product._id',
                        timesSold: 1,
                        price: '$product.price'
                    }
                }
            ]);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = analyticsController; 