# E-Commerce API

A RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Signup, Login, Logout)
- Product Management
- Shopping Cart
- Place Order
- User Profile Management

## API Endpoints

### Authentication
- POST /api/signup - Register a new user
- POST /api/login - User login
- POST /api/logout - User logout

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Add new product

### Cart
- GET /api/cart - View cart
- POST /api/cart - Add to cart

### Orders
- GET /api/orders - Get user orders
- POST /api/orders - Create order
- GET /api/orders/:orderId - Get single order
- PUT /api/orders/:orderId/status - Update order status

### Profile
- GET /api/profile - Get user profile

### Queries
- GET api/query/second-highest-order
- GET api/query/monthly-analysis-2023
- GET api/query/low-selling-products

## Installation

1. Clone the repository: git clone https://github.com/Parth-Patadia/evitalrx-task
2. Install dependencies:
   cd ecom-node
   npm install
3. Run the server: npm run dev

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing
