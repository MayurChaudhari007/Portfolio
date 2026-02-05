// const dotenv = require('dotenv');
// // Load env vars before anything else
// dotenv.config();

// const app = require('./src/app');
// const connectDB = require('./src/config/db');

// // Connect Database
// connectDB();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });



const dotenv = require('dotenv');
// Load env vars before anything else
dotenv.config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

// Connect Database with error handling
connectDB().catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Stop server if DB fails
});

const PORT = process.env.PORT || 5000;

// Explicitly bind to 0.0.0.0 for Render compatibility
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., random DB disconnects)
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});