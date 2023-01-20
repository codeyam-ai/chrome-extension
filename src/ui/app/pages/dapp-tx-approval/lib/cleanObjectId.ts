const cleanObjectId = (objectId: string) => {
    return objectId.replace('0x0', '').replace('0x', '');
};

export default cleanObjectId;