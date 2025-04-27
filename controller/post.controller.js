import PostModel from "../model/Post.js";
import TagModel from "../model/Tag.js";
import CustomError from "../utils/customError.js";
import uploadImage from "../utils/uploadImage.js";

const createPost = async (req, res, next) => {
    try {
        const {title, desc, tag} = req.body;
        const image = req.file;
        const tags = (tag.split(',')).map(item => item.trim());

        let imageURL = '';
        if (!title || !desc || tags.length == 0 || !image) {
            throw new CustomError('Title, Description, tags and image  are required', 400);
        } 

        const imageResponse = await uploadImage(image);

        imageURL = imageResponse.secure_url;

        const newPost = await PostModel.create({
            title,
            desc,
            tags,
            image: imageURL,
        });

        res.status(201).json({
            success: true,
            post: newPost
        })

    }
    catch(err) {
        next(err);
    }
}

const getAllPost = async (req, res, next) => {
    try {
        let { page = 1, limit = 10, sort = '-createdAt', keyword, tag } = req.query;
        /* convert the number */
        limit = +limit;
        page = +page;
        const query = {};
        const allowedParams = ['page', 'limit', 'sort', 'keyword', 'tag'];

        /* seperation for keyword multiple keywords */
        if (keyword) {
            const keywords = keyword.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
            if (keywords.length) {
                query.$text = { $search: keywords.join(' ') };
            }
        }

        /* seperation for mulitple tags */
        if (tag) {
            const tagNames = tag.split(',');

            const foundTag = await TagModel.find({ name: {$in: tagNames}});

            if (foundTag.length > 0 ) {
                const tagIds = foundTag.map(tag => tag._id);
                query.tags = { $in: tagIds };
            }
            else {
                throw new CustomError("No matching tags found", 404);
            }
        }

        /* if sort have the multiple fields to seperate it */
        const sortFields = sort.split(',').map(s => {
            let order = 1;
            let field = s.trim();
      
            if (field.startsWith('-')) {
              order = -1;
              field = field.slice(1);
            }

            // 4. Validate sort field
            const validSortFields = ['createdAt', 'title', 'desc'];
            if (!validSortFields.includes(field)) {
                throw new CustomError(`Invalid sort parameter "${field}"`, 400);
            }

            return { field, order };
        });

        const sortObject = sortFields.reduce((acc, { field, order }) => {
            acc[field] = order;
            return acc;
            }, {}
        );

        const skip = (+page - 1) * limit;
        const queryParams = Object.keys(req.query);
        const invalidParams = queryParams.filter(param => !allowedParams.includes(param));

        if (invalidParams.length > 0) {
            throw new CustomError(`Invalid query parameter: ${invalidParams.join(',')}`, 400);  
        }

        const posts = await PostModel.find(query).populate('tags').sort(sortObject).skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            totalCount: posts.length,
            posts,
            page: page,
            limit: limit,
        })
    }
    catch(err) {
        next(err);
    }
}  

export {createPost, getAllPost};