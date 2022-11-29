import type React from 'react';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
    const defaultClasses =
        'mx-auto w-[360px] overflow-hidden min-h-[564px] shadow-ethos-box-shadow sm:rounded-[20px] text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default';
    return (
        <div className={`${className || ''} ${defaultClasses}`}>{children}</div>
    );
};

export default BaseLayout;
