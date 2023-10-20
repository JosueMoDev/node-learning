import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('Mongo db init', () => {

    afterAll(()=>{
        mongoose.connection.close()
    });

    test('Should connect to Mongo BD', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(connected).toBeTruthy;
    });

    test("Should throw an error", async () => {
        try {        
            const connected = await MongoDatabase.connect({
              dbName: process.env.MONGO_DB_NAME!,
              mongoUrl: "mongodb://test:123456789@localhost:27017-WRONG-CHAIN",
            });
      
            expect(connected).toBeFalsy;
        } catch (error) {
            expect(`${error}`).toContain("MongooseError");
        }
    });

});