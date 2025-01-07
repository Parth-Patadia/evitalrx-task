const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const queryRoutes = require('./routes/query');

// Use routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', productRoutes);
app.use('/api', queryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 

git add src/app.js
git add src/controllers/queryController.js
git add src/routes/query.js