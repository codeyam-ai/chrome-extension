import { useCallback } from 'react';

import Subheader from '../../shared/typography/Subheader';

import type { TxApprovalTab } from './types/Base';

export type TabElementProps = {
    type: TxApprovalTab;
    isSelected: boolean;
    setTab: (tab: TxApprovalTab) => void;
};

const TabElement = ({ type, isSelected, setTab }: TabElementProps) => {
    const _setTab = useCallback(() => setTab(type), [setTab, type]);

    const selectedClass = isSelected
        ? 'text-ethos-light-primary-light dark:text-ethos-dark-primary-dark border-b-ethos-light-primary-light dark:border-b-ethos-dark-primary-dark'
        : 'text-ethos-light-text-medium dark:text-ethos-dark-text-medium border-b-ethos-light-text-medium dark:border-b-ethos-dark-text-medium';

    return (
        <div
            className={`cursor-pointer border-b ${selectedClass} font-semibold px-3 py-1`}
            onClick={_setTab}
        >
            <Subheader>{type}</Subheader>
        </div>
    );
};

export default TabElement;
