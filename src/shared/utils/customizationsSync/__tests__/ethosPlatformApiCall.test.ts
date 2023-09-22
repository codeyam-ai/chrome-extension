import { API_BASE_URL, EXPLORER_BASE_URL } from '_src/shared/constants';
import { explorerApiCall, authApiCall} from '../ethosPlatformApiCall';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  } as Response)
);

describe('API calls', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    // Test for explorerApiCall function
    it('calls fetch with the right args and returns successfully', async () => {
         // First, let's define what our "fetch" mock should return
         (fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ message: 'success' }),
            })
        );

        const returnValue = await explorerApiCall('my-example-path', 'POST', 'EXAMPLE-TOKEN', {name: 'test'});

        // Did we call fetch correctly?
        expect(fetch).toHaveBeenCalledWith(
            `${EXPLORER_BASE_URL}/api/my-example-path`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer EXAMPLE-TOKEN' },
                body: JSON.stringify({ name: 'test' }),
            }
        );

        // Did we get the expected result?
        expect(returnValue).toEqual({ json: { message: 'success' }, status: 200 });
    });

    // Test for authApiCall function
    it('calls fetch with the right args and returns error status code', async () => {
         // First, let's define what our "fetch" mock should return
         (fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({status: 404})
        );

        const returnValue = await authApiCall('my-example-path', 'POST', 'EXAMPLE-TOKEN', {name: 'test'});

        // Did we call fetch correctly?
        expect(fetch).toHaveBeenCalledWith(
            `${API_BASE_URL}/api/my-example-path`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer EXAMPLE-TOKEN' },
                body: JSON.stringify({ name: 'test' }),
            }
        );

        // Did we get the expected result?
        expect(returnValue).toEqual({ status: 404 });
    });
});