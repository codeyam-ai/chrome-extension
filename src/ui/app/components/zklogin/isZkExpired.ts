import { getCurrentEpoch } from '_src/shared/cryptography/current-epoch';

const isZkExpired = async (maxEpoch: number, minEpoch: number) => {
    const currentEpoch = await getCurrentEpoch();
    return maxEpoch < currentEpoch || minEpoch > currentEpoch;
};

export default isZkExpired;
