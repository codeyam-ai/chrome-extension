import type { ReactNode } from 'react';

const TransactionBody = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="flex grow flex-col items-center justify-center p-6"
            style={{ minHeight: '300px' }}
        >
            {children}
        </div>
    );
};

export default TransactionBody;
