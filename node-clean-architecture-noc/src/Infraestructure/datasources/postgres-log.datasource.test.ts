import { LogEntity, LogSeverityLevel } from "../../domain";
import { PostgresLogDataSource } from "./postgres-log.datasource";


describe('Postgres Datasource', () => {
 
    const postgresDatasource = new PostgresLogDataSource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: "saving log at postgres db",
        origin: "postgres-log.datasource.test.ts",
    });

    
    test('should save a log at Postgres', async () => {
    });
});