import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from './db/db.config.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);


//  Models Imports
import Admin from './models/admin.js';
import Project from './models/projectModel.js';
import Blog from './models/blogModel.js';

//  Multer and Cloudinary setup
import upload from './config/cloudinaryConfig.js';


// Database Connection
connectDB();

// Middleware
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
// Routes
app.get('/projects', async (req, res) => {
    try {

        const projects = await Project.find().sort({ _id: -1 });
        return res.status(200).json(projects); // Sirf ye ek line honi chahiye
    } catch (error) {
        return res.status(500).json({ message: "Fetch failed", error: error.message });
    }
});
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ _id: -1 });
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: "Fetch failed", error: error.message });
    }
})

app.post('/upload/projects', upload.single('image'), async (req, res) => {
    try {
        console.log("Incoming Body:", req.body); // Check karne ke liye data aa rha h ya nahi
        console.log("Incoming File:", req.file); // Check karne ke liye file parse hui ya nahi

        const { title, url, description, techStack } = req.body;

        // Agar file nahi milti toh validation error handle karo pehle hi
        if (!req.file) {
            return res.status(400).json({
                message: '[CRITICAL]: Cloudinary upload failed or file missing in multipart request.'
            });
        }

        // TechStack array handling
        let finalTechStack = [];
        if (typeof techStack === 'string') {
            finalTechStack = techStack.split(',').map(tech => tech.trim());
        } else if (Array.isArray(techStack)) {
            finalTechStack = techStack;
        }

        const newProject = await Project.create({
            title,
            url,
            image: req.file.path, // Cloudinary link
            description,
            techStack: finalTechStack
        });

        res.status(201).json({
            message: 'System deployment status: SUCCESS.',
            project: newProject
        });

    } catch (error) {
        console.error("CRASH LOG:", error); // Yeh terminal me crash details print karega
        res.status(500).json({
            message: 'Internal Database Handshake failed.',
            error: error.message
        });
    }
});
app.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Welcome Lucky Ali', token });
});
app.post('/admin/blog', upload.single('image'), async (req, res) => {
    try {
        // 1. Log metrics debug karne ke liye console me check karo
        console.log("---- BLOG DEPLOY MATRIX ----");
        console.log("Incoming fields:", req.body);
        console.log("Incoming file asset:", req.file);

        const { title, excerpt, content, readTime, tags } = req.body;

        // 2. Safe Payload Validation Check: File miss ho toh user validation response do
        if (!req.file) {
            return res.status(400).json({
                message: '[CRITICAL]: Cloudinary synchronization failed. Cover image asset stream is missing.'
            });
        }

        // 3. Tech Tags Processing: Frontend se FormData me string formatting handling
        let finalTags = [];
        if (typeof tags === 'string' && tags.trim() !== '') {
            finalTags = tags.split(',').map(tag => tag.trim());
        } else if (Array.isArray(tags)) {
            finalTags = tags;
        }

        // 4. Mongoose Document Generation to Atlas Cluster DB
        const newBlog = await Blog.create({
            title,
            excerpt,
            content,
            readTime: readTime || "5 min read", // Default fallback calculation
            tags: finalTags,
            imageUrl: req.file.path // Secure HTTPS cloud link returned from Cloudinary engine
        });

        // 5. Final Successful System Response Handshake
        return res.status(201).json({
            message: 'System log state: SUCCESS. Blog instance successfully deployed to live server database.',
            blog: newBlog
        });

    } catch (error) {
        // Backend console logs configuration for production errors tracking
        console.error("❌ CRITICAL BLOG EXCEPTION DATA GRID:", error);
        return res.status(500).json({
            message: 'Handshake timeout. Server transaction collapsed internally.',
            error: error.message
        });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});