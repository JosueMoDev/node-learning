import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string,
    dbName: string,

}

export class MongoDatabase {
    static async connect(options: ConnectionOptions) {

        const { mongoUrl, dbName } = options;

        try {

            await mongoose.connect(mongoUrl, { dbName: dbName });
            console.log('Database up')
            
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}