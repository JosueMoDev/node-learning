import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFile', () => {
    const customOptions = {
        fileContent: '',
        fileDestination: 'outputs-test',
        fileName: 'table del 7'
    }
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

    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        const CustomOutputFolderExists = fs.existsSync(customOptions.fileDestination);

        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });
        if (CustomOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });

    });


});