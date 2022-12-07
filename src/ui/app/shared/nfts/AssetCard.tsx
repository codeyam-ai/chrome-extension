import TxSui from '../svg/TxSui';

export const AssetCard = ({
    theme,
    isNft,
    imgUrl,
    name,
    icon,
}: {
    theme?: string;
    isNft: boolean;
    imgUrl?: string;
    name: string;
    icon?: JSX.Element;
}) => (
    <div className={'w-full'}>
        <div className={'flex flex-row justify-center items-center mb-4'}>
            {isNft && imgUrl ? (
                <img
                    className={'rounded-2xl w-[56px] h-[56px] auto'}
                    src={imgUrl}
                    alt={name}
                />
            ) : (
                <div className={'relative'} style={{ zIndex: 1 }}>
                    <TxSui
                        borderColor={theme === 'light' ? 'white' : '#111111'}
                    />
                </div>
            )}
            {icon && icon}
        </div>
    </div>
);
