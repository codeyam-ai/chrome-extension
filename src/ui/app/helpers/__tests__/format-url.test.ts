import formatUrl from "../format-url";

describe('formatUrl', () => {
  // should remove 'https://' prefix from URL
  it('should remove the \'https://\' prefix from the URL', () => {
    const url = 'https://www.example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });

  // should remove 'http://' prefix from URL
  it('should remove the \'http://\' prefix from the URL when it exists', () => {
    const url = 'http://www.example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });

  // should remove 'www.' prefix from URL
  it('should remove the \'www.\' prefix from the URL', () => {
    const url = 'www.example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });

  // should handle URL without prefix
  it('should handle URL without prefix', () => {
    const url = 'example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });

  // should handle URL with only 'www.' prefix
  it('should handle URL with only \'www.\' prefix', () => {
    const url = 'www.example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });

  // should handle URL with 'http://' and 'www.' prefixes
  it('should handle URL with \'http://\' and \'www.\' prefixes', () => {
    const url = 'http://www.example.com';
    const formattedUrl = formatUrl(url);
    expect(formattedUrl).toBe('example.com');
  });
});