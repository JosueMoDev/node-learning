import { ServerApp } from "./presentation/server-app";

describe('test app.ts', () => {

    test('Should call Server.run with values', async () => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '9', '-l', '20', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 9,
            limit: 20,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        });

    });
});