import { FileSystemDatasource } from "../Infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../Infraestructure/repositories/log.repository.impl";
import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
export class Server {
    public static start() {
        console.log(`server started on port ${envs.PORT}...`);
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('service up'),
                    () => console.log('Error on service'),
                ).execute("http://localhost:3000");
            }
        )
    }
}