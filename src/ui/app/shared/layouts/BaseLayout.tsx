import { cssTransition, ToastContainer } from 'react-toastify';

import { useTheme } from '_src/shared/utils/themeContext';

import type React from 'react';

import 'animate.css/animate.min.css';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Fade = cssTransition({
    enter: 'animate__animated animate__fadeIn',
    exit: 'animate__animated animate__fadeOut',
});

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
    const { resolvedTheme } = useTheme();

    const defaultClasses =
        'mx-auto w-[360px] min-h-[600px] shadow-ethos-box-shadow sm:rounded-[20px] text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default';

    return (
        <div className={`${className || ''} ${defaultClasses}`}>
            <ToastContainer
                position="top-center"
                transition={Fade}
                autoClose={2500}
                hideProgressBar
                newestOnTop={true}
                closeOnClick={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={resolvedTheme}
            />
            {children}
        </div>
    );
};

export default BaseLayout;
