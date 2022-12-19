export default function truncateString(str: string, num: number) {
    if (str.length > num) {
        return str.slice(0, num - 2) + '...';
    } else {
        return str;
    }
}
