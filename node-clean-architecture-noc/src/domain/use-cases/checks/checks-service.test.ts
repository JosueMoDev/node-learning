import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./checks-service";

describe('Check Service Use Case', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallBack = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallBack,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });
    

    test('should call successCallBack when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://google.com');
        expect(wasOk).toBeTruthy;
        expect(successCallBack).toHaveBeenCalled();
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        
    });
});