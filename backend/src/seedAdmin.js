

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
// This line ensures it finds the .env file in the backend root
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Ensure the path to your User model is correct
const User = require('./models/User'); 

const seedAdmin = async () => {
    try {
        // 1. Check if MONGODB_URI exists
        if (!process.env.MONGO_URI) {
            throw new Error("MONGODB_URI is not defined in your .env file");
        }

        // 2. Connect to MongoDB Atlas
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas...");

        // 3. Remove existing admin to avoid "User already exists" errors
        const email = 'chaudharimayur485@gmail.com';
        // await User.deleteOne({ email });
        // console.log(`Old user with email ${email} removed.`);

        // 4. Create new admin object
        // NOTE: We pass the PLAIN password 'admin123'. 
        // Your User model's .pre('save') hook will hash it automatically.
        const admin = new User({
            username: 'Mayur Chaudhari',
            email: email,
            password: 'Mayur@485', 
            role: 'admin'
        });

        // 5. Save to database
        await admin.save();
        
        console.log("-----------------------------------------");
        console.log("ADMIN ID CREATED SUCCESSFULLY!");
        console.log(`Email:    ${email}`);
        console.log(`Password: admin123`);
        console.log("-----------------------------------------");

        process.exit();
    } catch (err) {
        console.error("Error seeding admin:", err.message);
        process.exit(1);
    }
};

seedAdmin();