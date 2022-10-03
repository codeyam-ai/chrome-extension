import AccountAddress from '../../components/account-address';
import PageTitle from '../../shared/page-title';

const divider = (
    <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
        </div>
    </div>
);

export default function ReceivePage() {
    return (
        <div className="flex h-full max-w-full flex-col">
            <PageTitle
                title="Get some SUI"
                backLink="/tokens"
                className="capitalize mb-4"
                hideBackLabel={true}
            />
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-1 mb-2">
                Here&apos;s your wallet address. Coins and NFTs sent to this
                address will end up in your wallet.
            </p>
            <div className="flex flex-row justify-center items-center">
                <AccountAddress showLink={false} />
            </div>
            <div className="my-4">{divider}</div>
            <p className="text-gray-700 dark:text-gray-400 text-sm my-1">
                Or, get test coins from the DevNet faucet.
            </p>
            <a
                href="https://discord.com/channels/916379725201563759/971488439931392130"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-purple-500 hover:text-purple-600 dark:text-violet-400 dark:hover:text-violet-300"
            >
                Get DevNet coins →
            </a>
        </div>
    );
}
