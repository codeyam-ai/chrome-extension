export default function truncateString(str: string, num: number) {
    if (!str || str.length === 0) return str;
    if (str.length > num) {
        return str.slice(0, num - 2) + '..';
    } else {
        return str;
    }
}
