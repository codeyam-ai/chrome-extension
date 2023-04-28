import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';

const ManageWallets = () => {
    const { mnemonics, privateKeys } = useAppSelector(
        (state) => state.account.importNames
    );

    return (
        <div className="flex flex-col gap-6 py-6">
            <div className="px-6">
                <Body>
                    Import seed phrases and private keys from external wallets
                    to use in your Ethos wallet.
                </Body>
            </div>
            <div className="mx-6 p-6 flex flex-col gap-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-xl">
                <Header>Seed & Recovery Phrases</Header>
                {mnemonics.length > 0 ? (
                    <div className="p-3 flex gap-3 flex-wrap rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                        {mnemonics.map((mnemonic, index) => (
                            <Button
                                key={`${mnemonic}-${index}`}
                                buttonStyle="primary"
                                removeContainerPadding
                                to={`/home/manage-wallets/manage-seed?name=${mnemonic}`}
                            >
                                {mnemonic}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div className="mx-6 p-3 rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                        No imported seed phrases yet.
                    </div>
                )}
                <Button
                    buttonStyle="primary"
                    removeContainerPadding
                    to="/home/manage-wallets/import-seed"
                >
                    Import Seed Phrase
                </Button>
            </div>
            <div className="mx-6 p-6 flex flex-col gap-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-xl">
                <Header>Private Keys</Header>
                {privateKeys.length > 0 ? (
                    <div className="mx-6 p-3 rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                        {privateKeys.length} imported private keys.
                    </div>
                ) : (
                    <div className="mx-6 p-3 rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                        No imported private keys yet.
                    </div>
                )}
                <Button
                    buttonStyle="primary"
                    removeContainerPadding
                    to="/home/manage-wallets/import-key"
                >
                    Import Private Key
                </Button>
            </div>
        </div>
    );
};

export default ManageWallets;
