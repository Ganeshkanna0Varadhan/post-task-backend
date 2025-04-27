import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    desc: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId, ref: 'Tag',  
        required: true
    }],
}, {
    timestamps: true
})

PostSchema.index({title: 'text', desc: 'text'});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;