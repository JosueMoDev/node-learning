import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {

    test('Should return envs variables', () => {
        expect(envs).toEqual({
          PORT: 3000,
          MAILER_MAIL: "jonasjosuemoralese@gmail.com",
          MAILER_SECRET_KEY: "qwljelkjrlkjler",
          IS_PRODUCTION_MODE: true,
          MAILER_SERVICE: "gmail",
          MONGO_URL: "mongodb://test:123456789@localhost:27017",
          MONGO_DB_NAME: "nocdb-test",
          MONGO_USER_NAME: "test",
          MONGO_PASS: "123456789",
          POSTGRES_URL:
            "postgresql://postgres:mysecretpasswordTest@localhost:5432/nocdb-test",
          POSTGRES_USER: "postgres",
          POSTGRES_PASSWORD: "mysecretpasswordTest",
          POSTGRES_DB: "nocdb-test",
        });
    });

    test('Should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC'
        try {
            await import('./envs.plugin');
            expect(true).toBeFalsy;
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

});