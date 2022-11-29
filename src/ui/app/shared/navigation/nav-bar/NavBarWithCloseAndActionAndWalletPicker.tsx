import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import WalletProfile from '../../content/rows-and-lists/WalletProfile';
import BodyLarge from '../../typography/BodyLarge';
import EthosLink from '../../typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';

interface NavBarWithCloseAndActionAndWalletPickerProps {
    closeUrl: string;
    onClickClose?: () => void;
    actionText: string;
    onClickAction: () => void;
    onClickWalletPicker: () => void;
}

const NavBarWithCloseAndActionAndWalletPicker = ({
    closeUrl,
    onClickClose,
    actionText,
    onClickAction,
    onClickWalletPicker,
}: NavBarWithCloseAndActionAndWalletPickerProps) => {
    return (
        <div className="flex flex-row items-center justify-between p-6 border-b border-b-ethos-light-text-stroke dark:border-b-ethos-dark-text-stroke">
            <div className="flex flex-row gap-4 items-center">
                <Link to={closeUrl} onClick={onClickClose}>
                    <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                </Link>
                <BodyLarge isSemibold>
                    <EthosLink type={LinkType.None} onClick={onClickAction}>
                        {actionText}
                    </EthosLink>
                </BodyLarge>
            </div>
            <WalletProfile onClick={onClickWalletPicker} />
        </div>
    );
};

export default NavBarWithCloseAndActionAndWalletPicker;
