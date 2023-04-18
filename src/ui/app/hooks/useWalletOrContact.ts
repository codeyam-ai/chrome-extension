import useAppSelector from './useAppSelector';

import type { SuiAddress } from '@mysten/sui.js';

const useWalletOrContact = (address: SuiAddress) => {
    return useAppSelector(({ account, contacts }) => {
        const accountInfos = account.accountInfos;
        const contactsInfos = contacts.contacts;

        return (
            accountInfos.find(
                (accountInfo) => accountInfo.address === address
            ) || contactsInfos.find((contact) => contact.address === address)
        );
    });
};

export default useWalletOrContact;
