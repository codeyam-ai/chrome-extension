import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';

import Sui from '../../home/home/Sui';
import UnknownToken from '../../home/home/UnknownToken';

const SendCoinImage = ({
    iconUrl,
    symbol,
}: {
    iconUrl: string | null;
    symbol: string;
}) => {
    return (
        <div className="relative" style={{ height: '60px', width: '60px' }}>
            <div
                className="absolute bottom-0 left-0 bg-black rounded-full"
                style={{ height: '60px', width: '60px' }}
            />
            <div className="absolute bottom-1 left-0">
                {iconUrl ? (
                    <img
                        src={iconUrl}
                        alt={`coin-${symbol}`}
                        height={60}
                        width={60}
                    />
                ) : symbol === 'SUI' ? (
                    <Sui width={60} />
                ) : (
                    <UnknownToken />
                )}
            </div>
            <ArrowRightCircleIcon
                color="#9040F5"
                className="bg-white absolute -bottom-1 left-10 rounded-full"
                height={30}
            />
        </div>
    );
};

export default SendCoinImage;
