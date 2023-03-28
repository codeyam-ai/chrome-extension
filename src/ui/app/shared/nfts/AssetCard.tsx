import ipfs from '../../helpers/ipfs';
import FuncIcon from '../../pages/home/tokens/FuncIcon';
import NftIcon from '../../pages/home/tokens/NftIcon';
import UnknownToken from '../../pages/home/tokens/UnknownToken';
import TxSui from '../svg/TxSui';
import { Icon } from '../icons/Icon';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

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
    return (
        <div className={'w-full'}>
            <div className={'flex flex-row justify-center items-center mb-4'}>
                {safeImageUrl && (
                    <img
                        className={
                            'object-cover rounded-2xl w-[56px] h-[56px] auto'
                        }
                        src={safeImageUrl}
                        alt={name}
                    />
                )}

                <div className={'relative'} style={{ zIndex: 1 }}>
                    {txType === 'sui' && (
                        <TxSui
                            borderColor={
                                theme === 'light' ? 'white' : '#111111'
                            }
                        />
                    )}

                    {txType === 'coin' && (
                        <UnknownToken width={56} height={56} />
                    )}

                    {txType === 'nft' && <NftIcon width={56} height={56} />}

                    {txType === 'func' && <FuncIcon width={56} height={56} />}

                    {txType === 'transfer' && (
                        <Icon displayIcon={<ArrowUpRightIcon />} />
                    )}
                </div>

                {icon && icon}
            </div>
        </div>
    );
};
