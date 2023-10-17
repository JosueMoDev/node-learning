import 'dotenv/config';
import * as env from 'env-var';
interface ENVS {
    PORT: number,
    MAILER_MAIL: string,
    MAILER_SECRET_KEY: string,
    IS_PRODUCTION_MODE: boolean,
    MAILER_SERVICE: string
}
export const envs: ENVS = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_MAIL: env.get('MAILER_MAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    IS_PRODUCTION_MODE: env.get('IS_PRODUCTION_MODE').required().asBool(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),

}