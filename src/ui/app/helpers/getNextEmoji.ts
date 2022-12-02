import defaultEmojis from '_src/shared/emojiOptions';

const getNextEmoji = (nextAccountIndex: number): string => {
    return defaultEmojis[nextAccountIndex % defaultEmojis.length];
};

export default getNextEmoji;
