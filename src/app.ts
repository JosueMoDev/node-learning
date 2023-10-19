import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo-db/init";
import { LogModel } from "./data/mongo-db/models/log.model";
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { Server } from "./presentation/server-app";

(async() => {
    main();
})()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const newLog = await LogModel.create({
        message: 'Test from Mongo',
        origin: 'app.ts',
        level: LogSeverityLevel.low
    });

    await newLog.save();

    Server.start();
}