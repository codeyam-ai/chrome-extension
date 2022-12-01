import type React from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'animate.css/animate.min.css';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Fade = cssTransition({
    enter: 'animate__animated animate__fadeIn',
    exit: 'animate__animated animate__fadeOut',
});

const BaseLayout = ({ className, children }: BaseLayoutProps) => {
    const isDarkTheme = document
        .getElementsByTagName('html')[0]
        .classList.contains('dark');

    const defaultClasses =
        'relative mx-auto w-[360px] min-h-[564px] shadow-ethos-box-shadow sm:rounded-[20px] text-center bg-ethos-light-background-default dark:bg-ethos-dark-background-default';
    return (
        <div className={`${className || ''} ${defaultClasses}`}>
            <ToastContainer
                position="top-center"
                transition={Fade}
                autoClose={2500}
                hideProgressBar
                newestOnTop={true}
                closeOnClick={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={isDarkTheme ? 'light' : 'dark'}
            />
            {children}
        </div>
    );
};

export default BaseLayout;
