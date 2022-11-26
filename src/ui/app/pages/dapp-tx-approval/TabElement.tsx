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
        ? 'border-b-purple-800 text-purple-800 dark:border-b-purple-500 dark:text-purple-500 '
        : 'border-b-slate-200 text-slate-400 dark:border-b-slate-500 dark:text-slate-500';

    return (
        <div
            className={`cursor-pointer border-b ${selectedClass} font-semibold px-5 py-1`}
            onClick={_setTab}
        >
            {type}
        </div>
    );
};

export default TabElement;
