import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFile', () => {


    const customOptions = {
        fileContent: '',
        fileDestination: 'outputs-test',
        fileName: 'table del 7'
    }



    afterEach(() => {

        const outputFolderExists = fs.existsSync('outputs');
        const outputTestingFolderExists = fs.existsSync('test-destionation');

        const CustomOutputFolderExists = fs.existsSync(customOptions.fileDestination);

        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });
        if (CustomOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });
        if (outputTestingFolderExists) fs.rmSync('test-destionation', { recursive: true });

    });
    
    
    test('Should save a file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        }
        const filePath = 'outputs/table.txt';
        const result = saveFile.execute(options);

        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect(result).toBeTruthy;
        expect(fileExist).toBeTruthy;
        expect(fileContent).toBe(options.fileContent);

    });

    test('Should be file with custom values', () => {
        const saveFile = new SaveFile();
      
        const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy;
        expect(fileExist).toBeTruthy;
        expect(fileContent).toBe(customOptions.fileContent);


    });





    test('Should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
                throw new Error('This is a custom error from testing');
            }
        );

        const result = saveFile.execute(customOptions);
        expect(result).toBeFalsy;
        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
                throw new Error('This is a custom writting error message');
            }
        );

        const result = saveFile.execute(customOptions);
        expect(result).toBeTruthy;
        writeFileSpy.mockRestore();
    });


});