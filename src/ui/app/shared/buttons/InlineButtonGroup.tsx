import { type MouseEventHandler } from 'react';

import Button from './Button';

type InlineButtonGroupProps = {
    className?: string;
    onClickButtonPrimary?: MouseEventHandler<HTMLButtonElement>;
    buttonPrimaryTo?: string;
    buttonPrimaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonPrimaryTestId?: string;
    buttonPrimaryChildren?: React.ReactNode;
    isButtonPrimaryDisabled?: boolean;
    onClickButtonSecondary?: MouseEventHandler<HTMLButtonElement>;
    buttonSecondaryTo?: string;
    buttonSecondaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonSecondaryTestId?: string;
    buttonSecondaryChildren?: React.ReactNode;
    isButtonSecondaryDisabled?: boolean;
    isDanger?: boolean;
};

const InlineButtonGroup = ({
    className,
    onClickButtonPrimary,
    buttonPrimaryTo,
    buttonPrimaryType,
    buttonPrimaryTestId,
    buttonPrimaryChildren,
    isButtonPrimaryDisabled,
    onClickButtonSecondary,
    buttonSecondaryTo,
    buttonSecondaryType,
    buttonSecondaryTestId,
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
                data-testid={buttonSecondaryTestId}
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
                data-testid={buttonPrimaryTestId}
            >
                {buttonPrimaryChildren}
            </Button>
        </div>
    );
};

export default InlineButtonGroup;
