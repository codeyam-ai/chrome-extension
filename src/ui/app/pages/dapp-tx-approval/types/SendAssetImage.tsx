import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';

import UnknownToken from '../../home/tokens/UnknownToken';

const SendAssetImage = ({
    imageUrl,
    name,
}: {
    imageUrl?: string | null;
    name?: string;
}) => {
    return (
        <div className="relative" style={{ height: '90px', width: '90px' }}>
            <div
                className="absolute bottom-0 left-0 bg-ethos-dark-background-secondary dark:bg-ethos-light-background-secondary rounded-lg"
                style={{ height: '90px', width: '90px' }}
            />
            <div
                className="absolute bottom-1 left-1 flex"
                style={{ height: '90px', width: '90px' }}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`Asset ${name}`}
                        className="object-cover rounded-lg"
                    />
                ) : (
                    <UnknownToken />
                )}
            </div>
            <ArrowRightCircleIcon
                color="#9040F5"
                className="bg-white absolute -bottom-1 -right-3 rounded-full"
                height={30}
            />
        </div>
    );
};

export default SendAssetImage;
