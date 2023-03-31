import { ShieldExclamationIcon } from '@heroicons/react/20/solid';

import type { ReactNode } from 'react';

const Warning = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text-[#9040F5] flex gap-2 items-center text-sm">
            <ShieldExclamationIcon height={45} />
            {children}
        </div>
    );
};

export default Warning;
