import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

const TagModel = mongoose.model('Tag', TagSchema);

export default TagModel;