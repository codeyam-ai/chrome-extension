import type React from 'react';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
    const defaultClasses =
        'mx-auto w-[360px] min-h-[475px] pt-4 shadow-ethos-box-shadow rounded-lg text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default';
    return (
        <div className={`${className || ''} ${defaultClasses}`}>{children}</div>
    );
};

export default BaseLayout;
