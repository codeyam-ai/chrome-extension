// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (arr: any[]) => {
    const newArray = [...arr];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
};

export default shuffleArray;
