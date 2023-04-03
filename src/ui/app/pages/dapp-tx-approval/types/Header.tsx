import type { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement }) => {
    return (
        <div className="mx-6 my-3 rounded-xl bg-ethos-light-purple p-3 flex-col items-center gap-6">
            {children}
        </div>
    );
};

export default Header;
