import cl from 'classnames';

import st from './LoadingIndicator.module.scss';

const LoadingIndicator = ({
    className,
    big,
    white,
}: {
    className?: string;
    big?: boolean;
    white?: boolean;
}) => {
    return (
        <span
            className={cl(st.spinner, white ? st.spinnerWhite : '', className)}
            data-testid="loading"
            style={
                big ? { width: '3em', height: '3em', marginTop: '24px' } : {}
            }
        />
    );
};

export default LoadingIndicator;
