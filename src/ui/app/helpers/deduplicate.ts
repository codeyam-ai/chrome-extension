const deduplicate = (results: string[] | undefined) =>
    results
        ? results.filter((value, index, self) => self.indexOf(value) === index)
        : [];

export default deduplicate;
