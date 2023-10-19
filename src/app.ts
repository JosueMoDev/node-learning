import { envs } from "./config";
import { MongoDatabase } from "./mongo-db";
import { Server } from "./presentation";

(async() => {
    main();
})()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    Server.start();
}