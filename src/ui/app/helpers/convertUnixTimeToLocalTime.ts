export default function convertUnixTimeToLocalTime(unixTime: number) {
    const date = new Date(unixTime);
    const timeDisplay = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    });
    const dateDisplay = date.toLocaleDateString();
    return `${timeDisplay} ${dateDisplay}`;
}
