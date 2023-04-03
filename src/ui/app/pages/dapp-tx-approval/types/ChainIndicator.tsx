import { SignalIcon } from '@heroicons/react/24/outline';

import { API_ENV } from '_src/ui/app/ApiProvider';
import Body from '_src/ui/app/shared/typography/Body';

const ChainIndicator = ({ apiEnv }: { apiEnv: API_ENV }) => {
    let chain;
    switch (apiEnv) {
        case API_ENV.customRPC:
            chain = 'sui:custom';
            break;
        case API_ENV.devNet:
            chain = 'sui:devnet';
            break;
        case API_ENV.testNet:
            chain = 'sui:testnet';
            break;
    }

    if (!chain) return <></>;

    const [chainName, network] = chain.split(':');

    return (
        <div className="flex justify-center">
            <div className="my-3 flex gap-1 items-center">
                <SignalIcon color="#9040F5" height={24} />
                <Body>{chainName.toUpperCase()}</Body>
                <Body isSemibold>{network.toUpperCase()}</Body>
            </div>
        </div>
    );
};

export default ChainIndicator;
