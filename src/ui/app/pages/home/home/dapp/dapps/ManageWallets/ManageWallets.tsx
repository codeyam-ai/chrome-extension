import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';

const ManageWallets = () => {
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
                <div className="mx-6 p-3 rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                    No imported seed phrases yet.
                </div>
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
                <div className="mx-6 p-3 rounded-xl bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                    No imported private keys yet.
                </div>
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
