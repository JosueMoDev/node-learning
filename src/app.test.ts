import { ServerApp } from './presentation/serve-app';
describe('Server App', () => {
    test('Should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });
});