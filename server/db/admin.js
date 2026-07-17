import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './db.config.js';
import Admin from '../models/admin.js';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);


dotenv.config();
await connectDB();

const existingAdmin = await Admin.findOne();

if (existingAdmin) {
    console.log('Admin already exists. No new admin created.');
} else {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword
    });
    console.log('Admin created successfully!');
}

mongoose.connection.close();