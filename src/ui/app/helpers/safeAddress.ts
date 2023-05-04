const safeAddress = (address?: string): string | undefined => {
    if (!address) return address;

    if (address.indexOf('0X') === 0) {
        address = address.replace('0X', '0x');
    }
    return address;
};

export default safeAddress;
