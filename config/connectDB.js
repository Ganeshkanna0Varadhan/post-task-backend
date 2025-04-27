import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.DB_URI, {
        //     connectTimeoutMS: 10000
        // })
        await mongoose.connect(process.env.DEV_DB_URI, {
            connectTimeoutMS: 10000
        });
        
        console.log('Database connect successfully');
    }
    catch(err) {
        console.log("error ", err);
        process.exit(1);
    }
}

export default connectDB;