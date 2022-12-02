import TxSui from '../svg/TxSui';

export const AssetCard = ({
    isNft,
    imgUrl,
    name,
    icon,
}: {
    isNft: boolean;
    imgUrl?: string;
    name: string;
    icon?: JSX.Element;
}) => (
    <div className={'w-full'}>
        <div className={'flex flex-row justify-center mb-4'}>
            {isNft && imgUrl ? (
                <img
                    className={'rounded-2xl w-[58px] h-[58px] auto'}
                    src={imgUrl}
                    alt={name}
                />
            ) : (
                <TxSui />
            )}
            {icon && icon}
        </div>
    </div>
);
