import { envs } from "../../config";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('Log.model.test.ts', () => {

    beforeAll(async() => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });
    

    test('should return LogModel', async() => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }
        const log = await LogModel.create(logData);
        
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }));

        await LogModel.findByIdAndDelete(log.id);
    });


    test('should return a schema object', () => {
        const schema = LogModel.schema.obj;
        expect(schema).toEqual(expect.objectContaining({
        message: { type: expect.any(Function), require: true },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        origin: expect.any(Function),
        createdAt: expect.any(Object)
      }))
    });
});