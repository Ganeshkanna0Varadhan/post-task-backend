import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import postRouter from './routes/post.routes.js';
import tagRouter from './routes/tag.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173", "https://post-task-frontend.vercel.app"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json({
        message: 'server is running Successfully'
    })
});

app.use('/api/v1/post', postRouter);
app.use('/api/v1/tag', tagRouter);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, 
        () => { 
            console.log("server running on http://localhost:5000");
        }
    )
})

