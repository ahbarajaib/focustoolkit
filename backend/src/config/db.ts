import mongoose from 'mongoose'

const connectToDatabase = async () => {

    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/focustoolkit";
        await mongoose.connect(mongoUri)
        console.log('Database connection established successfully...')
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }

}

export default connectToDatabase;
