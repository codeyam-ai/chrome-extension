import { useCallback } from 'react';

import type { TxApprovalTab } from './index';

export type TabElementProps = {
    type: TxApprovalTab;
    isSelected: boolean;
    setTab: (tab: TxApprovalTab) => void;
};

const TabElement = ({ type, isSelected, setTab }: TabElementProps) => {
    const _setTab = useCallback(() => setTab(type), [setTab, type]);

    const selectedClass = isSelected
        ? 'border-b-purple-800 text-purple-800'
        : '';

    return (
        <div
            className={`border-b ${selectedClass} font-semibold px-3 py-1`}
            onClick={_setTab}
        >
            {type}
        </div>
    );
};

export default TabElement;
