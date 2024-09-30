const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const testRoute = require('./routes/testRoute');
const { protectRoute } = require('./middleware/protectRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/data', protectRoute, testRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
