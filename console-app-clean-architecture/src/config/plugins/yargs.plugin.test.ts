
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./yargs.plugin');
    return yarg;
}




describe('Test yargs.plugin.ts', () => {
    
    const originalArgv = process.argv
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });
    
    test('Should return default values', async () => {
        const yargs = await runCommand(['-b', '7']);
        expect(yargs).toEqual( expect.objectContaining({
            b: 7,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });

    test('Should return configuration with custom values', async () => {

        const yargs = await runCommand(['-b', '7', '-l', '15', '-s', '-n', '7-Multiplication-table', '-d', 'testing-outputs']);
        expect(yargs).toEqual( expect.objectContaining({
            b: 7,
            l: 15,
            s: true,
            n: '7-Multiplication-table',
            d: 'testing-outputs',
        }));
        
    });
});
