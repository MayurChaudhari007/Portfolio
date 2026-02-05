// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean'); 
// // Route Imports
// const authRoutes = require('./routes/auth.routes');
// const aboutRoutes = require('./routes/about.routes');
// const skillRoutes = require('./routes/skill.routes');
// const projectRoutes = require('./routes/project.routes');
// const postRoutes = require('./routes/post.routes');
// const uploadRoutes = require('./routes/upload.routes');
// const path = require('path');
// const profileRoutes = require('./routes/profile.routes');

// const app = express();

// // Middleware
// app.use(helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//     contentSecurityPolicy: false, // Disabling CSP helps during local development
// }));
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Body parser
// app.use(mongoSanitize()); // Prevent NoSQL injection
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev')); // Logging
// }

// // Mount Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/about', aboutRoutes);
// app.use('/api/skills', skillRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/upload', uploadRoutes);

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // Root Route
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // 404 Handler
// app.use((req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// });

// // Error Handler
// app.use((err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({
//         success: false,
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// });

// module.exports = app;















const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

// Route Imports
const authRoutes = require('./routes/auth.routes');
const aboutRoutes = require('./routes/about.routes');
const skillRoutes = require('./routes/skill.routes');
const projectRoutes = require('./routes/project.routes');
const postRoutes = require('./routes/post.routes');
const uploadRoutes = require('./routes/upload.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();

// --- 1. MIDDLEWARE SETTINGS ---

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, 
}));

// CORS Configuration - Production Ready
const allowedOrigins = [
    "http://localhost:5173", // Vite default
    "http://localhost:3000", 
    process.env.FRONTEND_URL  // This will be your Render Frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS policy'));
        }
    },
    credentials: true
}));

app.use(express.json()); // Body parser
app.use(mongoSanitize()); // Prevent NoSQL injection

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging
}

// --- 2. MOUNT ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);

// Static files (Keep this for local legacy, though you use Cloudinary now)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root Route - Good for Render Health Checks
app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running smoothly...' });
});

// --- 3. ERROR HANDLING ---

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

module.exports = app;