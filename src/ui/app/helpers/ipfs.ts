const ipfs = (url: string) => {
    return url.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/');
};

export default ipfs;
