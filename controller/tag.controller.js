import TagModel from "../model/Tag.js";
import CustomError from "../utils/customError.js";

const createTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new CustomError("Tag name is required", 400);
        }
        const tag = await TagModel.create({ name });

        res.status(201).json({
            success: true,
            tag
        });
    }
    catch (err) {
        next(err);
    }
}


const getAllTag = async (req, res, next) => {
    try {
        const tags = await TagModel.find();

        res.status(200).json({
            success: true,
            tags
        })
    }
    catch(err) {
        next(err);
    }
}

const deleteTag = async (req, res, next) => {
    try {
        const tagId = req.params.id;

        if (!tagId) {
            throw new CustomError('Invalid or empty tag Id', 400)
        }

        const tag = await TagModel.findByIdAndDelete(tagId);

        if (!tag) {
            throw new CustomError('Tag not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Tag deleted successfully'
        })
    }   
    catch(err) {
        next(err);
    }
}

export { createTag, getAllTag, deleteTag };