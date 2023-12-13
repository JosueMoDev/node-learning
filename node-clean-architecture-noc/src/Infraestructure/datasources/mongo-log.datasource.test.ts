import mongoose from "mongoose";
import { envs } from "../../config";
import { LogModel, MongoDatabase } from "../../mongo-db";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain";

describe('Mongo Log DataSource', () => {

    const mongoLogDatasource = new MongoLogDatasource();
    const log = new LogEntity({
       level: LogSeverityLevel.medium,
       message: "saving log at mongo db",
       origin: "mongo-log.datasource.test.ts",
    });

    beforeAll(async() => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    });

    afterEach( async () => {
        await LogModel.deleteMany();
    });
    

    afterAll(() => {
        mongoose.connection.close();
    });
    
    

    test('should create a log', async() => {
        const result =  await mongoLogDatasource.saveLog(log);
        expect(result).toBe(true);
    });


    test('should get logs', async () => {
        await mongoLogDatasource.saveLog(log);

        const result = await mongoLogDatasource.getLogs(LogSeverityLevel.medium);
        expect(result.length).toEqual(1);
        
    });
});