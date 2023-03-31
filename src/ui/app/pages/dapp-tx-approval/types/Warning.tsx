import { ShieldExclamationIcon } from '@heroicons/react/20/solid';

import type { ReactNode } from 'react';

const Warning = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text-[#9040F5] flex gap-3 items-start">
            <ShieldExclamationIcon height={30} />

            {children}
        </div>
    );
};

export default Warning;
