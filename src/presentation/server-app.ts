import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CronService } from "./cron/cron-service";

export class Server {
    public static start() {
        console.log('server started ...');
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log('service up'),
                    () => console.log('Error on service')
                ).execute("http://localhost:3000");
            }
        )
    }
}