import { type MouseEventHandler } from 'react';

import Button from './Button';

type InlineButtonGroupProps = {
    className?: string;
    onClickButtonPrimary?: MouseEventHandler<HTMLButtonElement>;
    buttonPrimaryTo?: string;
    buttonPrimaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonPrimaryChildren?: React.ReactNode;
    isButtonPrimaryDisabled?: boolean;
    onClickButtonSecondary?: MouseEventHandler<HTMLButtonElement>;
    buttonSecondaryTo?: string;
    buttonSecondaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonSecondaryChildren?: React.ReactNode;
    isButtonSecondaryDisabled?: boolean;
    isDanger?: boolean;
};

const InlineButtonGroup = ({
    className,
    onClickButtonPrimary,
    buttonPrimaryTo,
    buttonPrimaryType,
    buttonPrimaryChildren,
    isButtonPrimaryDisabled,
    onClickButtonSecondary,
    buttonSecondaryTo,
    buttonSecondaryType,
    buttonSecondaryChildren,
    isButtonSecondaryDisabled,
    isDanger,
}: InlineButtonGroupProps) => {
    return (
        <div className={`${className || ''} grid grid-cols-2 gap-3 px-6`}>
            <Button
                buttonStyle="secondary"
                onClick={onClickButtonSecondary}
                to={buttonSecondaryTo}
                type={buttonSecondaryType}
                isInline={true}
                disabled={isButtonSecondaryDisabled}
                isDanger={isDanger}
            >
                {buttonSecondaryChildren}
            </Button>
            <Button
                buttonStyle="primary"
                onClick={onClickButtonPrimary}
                to={buttonPrimaryTo}
                type={buttonPrimaryType}
                isInline={true}
                disabled={isButtonPrimaryDisabled}
                isDanger={isDanger}
            >
                {buttonPrimaryChildren}
            </Button>
        </div>
    );
};

export default InlineButtonGroup;
