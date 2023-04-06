import ipfs from '../../helpers/ipfs';
import UnknownToken from '../../pages/home/tokens/UnknownToken';
import TxSui from '../svg/TxSui';
import { PhotoIcon } from '@heroicons/react/24/solid';

export const AssetCard = ({
    theme,
    txType,
    imgUrl,
    name,
    icon,
}: {
    theme?: string;
    txType: string;
    imgUrl?: string;
    name: string;
    icon?: JSX.Element;
    coinType?: string;
}) => {
    const safeImageUrl = imgUrl ? ipfs(imgUrl) : null;

    console.log('tx type: ', txType);

    return (
        <div className={'w-full'}>
            <div className={'flex flex-row justify-center items-center mb-4'}>
                {txType === 'nft' ? (
                    safeImageUrl ? (
                        <img
                            className={
                                'object-cover rounded-2xl w-[56px] h-[56px] auto'
                            }
                            src={safeImageUrl}
                            alt={name}
                        />
                    ) : (
                        <div
                            className={
                                'flex w-[54px] h-[54px] justify-center items-center bg-[#3D5FF2] rounded-xl'
                            }
                        >
                            <PhotoIcon width={28} height={28} />
                        </div>
                    )
                ) : txType === 'sui' ? (
                    <TxSui
                        borderColor={theme === 'light' ? 'white' : '#111111'}
                    />
                ) : safeImageUrl ? (
                    <img
                        className={
                            'object-cover rounded-full w-[56px] h-[56px] auto'
                        }
                        src={safeImageUrl}
                        alt={name}
                    />
                ) : (
                    <div className={'z-10'}>
                        <UnknownToken width={56} height={56} />
                    </div>
                )}
                {icon && icon}
            </div>
        </div>
    );
};
