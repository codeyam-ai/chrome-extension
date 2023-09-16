import { apiCall } from '../simpleApiCall';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  } as Response)
);

describe('apiCall', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('sends a fetch request to the correct URL', async () => {
    const args = {
      relativePath: 'testPath',
      method: 'GET',
      accessToken: 'testToken',
      secure: false,
    };
    await apiCall(args);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/testPath',
      expect.any(Object)
    );
  });

  it('includes the accessToken in the headers', async () => {                                                                                                            
    const args = {                                                                                                                                                       
      relativePath: 'mockRelativePath',                                                                                                                                  
      method: 'GET',                                                                                                                                                     
      accessToken: 'mockAccessToken',                                                                                                                                    
      secure: true,                                                                                                                                                      
    };                                                                                                                                                                   
    await apiCall(args);                                                                                                                                                 
    expect(fetch).toHaveBeenCalledWith(                                                                                                                                  
      expect.any(String),                                                                                                                                                
      expect.objectContaining({                                                                                                                                          
        headers: {                                                                                                                                                       
          'Content-Type': 'application/json',                                                                                                                            
          'X-Supabase-Access-Token': args.accessToken                                                                                                                    
        }                                                                                                                                                                
      })                                                                                                                                                                 
    );                                                                                                                                                                   
  });            
});
