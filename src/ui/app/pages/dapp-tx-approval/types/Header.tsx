import type { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement }) => {
    return (
        <div className="px-6">
            <div className="rounded-xl bg-ethos-light-gray p-3 flex-col items-center gap-6 mb-3">
                {children}
            </div>
        </div>
    );
};

export default Header;
