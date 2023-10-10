import ipfs from '../ipfs';

describe('ipfs function', () => {
  
  // Test case for replacing "ipfs://" with "https://ipfs.io/ipfs/"
  it('should replace ipfs:// with https://ipfs.io/ipfs/', () => {
    const input = 'ipfs://QmSomeHash';
    const expectedOutput = 'https://ipfs.io/ipfs/QmSomeHash';
    expect(ipfs(input)).toBe(expectedOutput);
  });

  // Test case for not altering URLs that don't start with "ipfs://"
  it('should not alter URLs that do not start with ipfs://', () => {
    const input = 'https://example.com';
    expect(ipfs(input)).toBe(input);
  });

  // Test case for handling empty strings
  it('should return an empty string if the input is an empty string', () => {
    const input = '';
    expect(ipfs(input)).toBe('');
  });
});
