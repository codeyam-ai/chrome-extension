import AccountAddress from '../../components/account-address';
import PageTitle from '../../shared/page-title';

export default function BuyPage() {
    return (
        <div className="flex h-full max-w-full flex-col">
            <PageTitle
                title="Buy SUI"
                backLink="/tokens"
                className="capitalize mb-4"
                hideBackLabel={true}
            />
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-1 mb-2">
                Sui is in the DevNet stage right now, so you can not purchase
                Sui.
            </p>
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-1 mb-2">
                You can find a &quot;faucet&quot; that will give you free test
                tokens in the{' '}
                <a
                    href="https://discord.com/channels/916379725201563759/971488439931392130"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-purple-500 hover:text-purple-600 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Sui Discord
                </a>
            </p>
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-1 mb-2">
                Here is your wallet address to request tokens:
            </p>
            <div className="flex flex-row justify-center items-center">
                <AccountAddress showLink={false} />
            </div>
        </div>
    );
}
