export const truncateMiddle = (input: string) =>
    input.length > 5
        ? `${input.substring(0, 4)}...${input.substring(
              input.length - 4,
              input.length
          )}`
        : input;
