// import { Transaction } from '@mysten/sui.js';
// import get from 'lodash/get';

// import { growthbook } from '../../experimentation/feature-gating';
// import { api } from '../../redux/store/thunk-extras';

const SENDER = '0x0000000000000000000000000000000000000002';
// const DEV_INSPECT_RESULT_PATH_0 = 'results.Ok[0][1].returnValues[0][0]';
// const DEV_INSPECT_RESULT_PATH_1 = 'results.Ok[0][1].returnValues[1][0]';

// const toHexString = (byteArray: Uint8Array) =>
//     byteArray?.length > 0
//         ? Array.from(byteArray, (byte) =>
//               ('0' + (byte & 0xff).toString(16)).slice(-2)
//           ).join('')
//         : '';

// const toString = (byteArray: Uint8Array) =>
//     byteArray?.length > 0
//         ? new TextDecoder().decode(Buffer.from(byteArray.slice(1)).buffer)
//         : '';

// const trimAddress = (address: string) =>
//     String(address?.match(/0x0{0,}([\w\d]+)/)?.[1]);

// const toFullAddress = (trimmedAddress: string) =>
//     trimmedAddress ? `0x${trimmedAddress.padStart(40, '0')}` : '';

// const getNameserviceValues = async () => {
//     return growthbook.getFeatureValue('nameservice', {
//         packageAddress: '',
//         registryAddress: '',
//     });
// };

export const getSuiName = async (address: string, sender: string = SENDER) => {
    return address;
    // const suiProvider = api.instance.fullNode;
    // // try {
    //     const { packageAddress, registryAddress } =
    //         await getNameserviceValues();

    //     const registryTx = new Transaction();
    //     registryTx.add(
    //         Transaction.Commands.MoveCall({
    //             target: `${packageAddress}::base_registry::get_record_by_key`,
    //             arguments: [
    //                 registryTx.object(registryAddress),
    //                 registryTx.pure(`${trimAddress(address)}.addr.reverse`),
    //             ],
    //         })
    //     );
    //     const resolverBytes = get(
    //         await suiProvider.devInspectTransaction({
    //             sender: sender,
    //             transaction: registryTx,
    //         }),
    //         DEV_INSPECT_RESULT_PATH_1
    //     );
    //     if (!resolverBytes) return address;

    //     const resolver = toFullAddress(toHexString(resolverBytes));
    //     const resolverTx = new Transaction();
    //     resolverTx.add(
    //         Transaction.Commands.MoveCall({
    //             target: `${packageAddress}::resolver::name`,
    //             arguments: [
    //                 registryTx.object(resolver),
    //                 registryTx.pure(address),
    //             ],
    //         })
    //     );
    //     const resolverResponse = await suiProvider.devInspectTransaction({
    //         sender: sender,
    //         transaction: resolverTx,
    //     });

    //     const nameByteArray = get(resolverResponse, DEV_INSPECT_RESULT_PATH_0);
    //     if (!nameByteArray) return address;

    //     const name = toString(nameByteArray);
    //     return name;
    // // } catch (e) {
    // //     // eslint-disable-next-line no-console
    // //     console.log('Error retreiving SuiNS Name', e);
    // //     return address;
    // // }
};

export const getSuiAddress = async (
    domain: string,
    sender: string = SENDER
) => {
    return domain;
    // const suiProvider = api.instance.fullNode;

    // const { packageAddress, registryAddress } = await getNameserviceValues();

    // // try {
    //     const registryTx = new Transaction();
    //     registryTx.add(
    //         Transaction.Commands.MoveCall({
    //             target: `${packageAddress}::base_registry::get_record_by_key`,
    //             arguments: [
    //                 registryTx.object(registryAddress),
    //                 registryTx.pure(domain),
    //             ],
    //         })
    //     );
    //     const resolverResponse = await suiProvider.devInspectTransaction({
    //         sender: sender,
    //         transaction: registryTx,
    //     });
    //     const resolverBytes = get(resolverResponse, DEV_INSPECT_RESULT_PATH_1);
    //     if (!resolverBytes) return domain;

    //     const resolver = toFullAddress(toHexString(resolverBytes));
    //     const resolverTx = new Transaction();
    //     resolverTx.add(
    //         Transaction.Commands.MoveCall({
    //             target: `${packageAddress}::resolver::addr`,
    //             arguments: [
    //                 registryTx.object(resolver),
    //                 registryTx.pure(domain),
    //             ],
    //         })
    //     );
    //     const resolverResponse2 = await suiProvider.devInspectTransaction({
    //         sender: sender,
    //         transaction: resolverTx,
    //     });
    //     const addr = get(resolverResponse2, DEV_INSPECT_RESULT_PATH_0);

    //     if (!addr) return domain;

    //     return toFullAddress(toHexString(addr));
    // // } catch (e) {
    // //     // eslint-disable-next-line no-console
    // //     console.log('Error retrieving address from SuiNS name', e);
    // //     return domain;
    // // }
};
