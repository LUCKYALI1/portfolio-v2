import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    ,
    date : {
        type: Date,
        default: Date.now
    }
    ,
    readTime : {
        type: String,
    },
    tags: {
        type: [String],
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    
    }


})

const blog = mongoose.model('Blog', blogSchema);

export default blog;