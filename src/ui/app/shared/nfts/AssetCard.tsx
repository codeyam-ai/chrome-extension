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
                !isFunc && (
                    <div className={'relative'} style={{ zIndex: 1 }}>
                        {coinType !== 'SUI' ? (
                            imgUrl ? (
                                <img
                                    src={imgUrl}
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
