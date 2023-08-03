import useAppSelector from './useAppSelector';

const useWalletOrContact = (address: string) => {
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
