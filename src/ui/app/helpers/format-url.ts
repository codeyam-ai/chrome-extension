export default function formatUrl(url: string) {
    // Remove the 'https://' prefix from the URL
    url = url.replace('https://', '');

    // Remove the 'http://' prefix from the URL
    url = url.replace('http://', '');

    // Remove the 'www.' prefix from the URL
    url = url.replace('www.', '');

    return url;
}

/**
 * Removes the 'https://', 'http://', and 'www.' prefixes from a given URL.
 *
 * @param url - The URL to be formatted.
 * @returns The formatted URL without any 'https://', 'http://', or 'www.' prefixes.
 *
 * @example
 * const url = 'https://www.example.com';
 * const formattedUrl = formatUrl(url);
 * console.log(formattedUrl);
 * // Output: 'example.com'
 */
