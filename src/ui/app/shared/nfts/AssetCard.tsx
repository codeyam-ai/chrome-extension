import ipfs from '../../helpers/ipfs';
import UnknownToken from '../../pages/home/tokens/UnknownToken';
import TxSui from '../svg/TxSui';

export const AssetCard = ({
    theme,
    isNft,
    isFunc,
    imgUrl,
    name,
    icon,
    coinType,
}: {
    theme?: string;
    isNft: boolean;
    isFunc: boolean;
    imgUrl?: string;
    name: string;
    icon?: JSX.Element;
    coinType?: string;
}) => {
    const safeImageUrl = imgUrl ? ipfs(imgUrl) : null;
    return (
        <div className={'w-full'}>
            <div className={'flex flex-row justify-center items-center mb-4'}>
                {isNft && safeImageUrl ? (
                    <img
                        className={
                            'object-cover rounded-2xl w-[56px] h-[56px] auto'
                        }
                        src={safeImageUrl}
                        alt={name}
                    />
                ) : (
                    !isFunc && (
                        <div className={'relative'} style={{ zIndex: 1 }}>
                            {coinType !== 'SUI' ? (
                                safeImageUrl ? (
                                    <img
                                        src={safeImageUrl}
                                        alt={name}
                                        className="w-[56px] h-[56px]"
                                    />
                                ) : (
                                    <UnknownToken width={56} height={56} />
                                )
                            ) : (
                                <TxSui
                                    borderColor={
                                        theme === 'light' ? 'white' : '#111111'
                                    }
                                />
                            )}
                        </div>
                    )
                )}
                {icon && icon}
            </div>
        </div>
    );
};
