import type { ReactNode } from 'react';

const ActionIcon = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className={`flex items-center h-10 w-10 rounded-full p-3 text-white bg-ethos-light-primary-light dark:bg-ethos-dark-primary-light`}
        >
            {children}
        </div>
    );
};

export default ActionIcon;
