import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    test('Should crete table with default values', () => {
        const createTable = new CreateTable();
        
        const table = createTable.execute({ base : 7 });
        const rows = table.split('\n');
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toContain('7 x 1 = 7');
        expect(rows).toContain('7 x 10 = 70');
        expect(rows.length).toBe(10);
    });

    test('Should create table with custom values', () => {
        const createTable = new CreateTable();
        const options = {
            base : 3,
            limit: 10
        }
        const table = createTable.execute(options);
        const rows = table.split("\n");

        expect(rows).toContain(rows[0]);
        expect(rows).toContain(rows[options.limit - 1]);
        expect(rows.length).toBe(options.limit);

        
        
    });
});