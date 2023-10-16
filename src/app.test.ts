import { CreateTable } from './domain/use-cases/create-table.use-case';
import { SaveFile } from './domain/use-cases/save-file.use-case';
import { ServerApp } from './presentation/serve-app';

const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destionation',
    fileName: 'test-filename'
}


describe('Server App', () => {

    
    test('Should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('Should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


    
        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenLastCalledWith('File created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });


        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
    
    
    });
});