import { type MouseEventHandler } from 'react';

import Button from './Button';

type InlineButtonGroupProps = {
    className?: string;
    onClickButtonPrimary?: MouseEventHandler<HTMLButtonElement>;
    buttonPrimaryTo?: string;
    buttonPrimarytype?: 'button' | 'submit' | 'reset' | undefined;
    buttonPrimaryChildren?: React.ReactNode;
    isButtonPrimaryDisabled?: boolean;
    onClickButtonSecondary?: MouseEventHandler<HTMLButtonElement>;
    buttonSecondaryTo?: string;
    buttonSecondaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonSecondaryChildren?: React.ReactNode;
    isButtonSecondaryDisabled?: boolean;
};

const InlineButtonGroup = ({
    className,
    onClickButtonPrimary,
    buttonPrimaryTo,
    buttonPrimarytype,
    buttonPrimaryChildren,
    isButtonPrimaryDisabled,
    onClickButtonSecondary,
    buttonSecondaryTo,
    buttonSecondaryType,
    buttonSecondaryChildren,
    isButtonSecondaryDisabled,
}: InlineButtonGroupProps) => {
    return (
        <div className={`${className || ''} grid grid-cols-2 gap-2 px-6`}>
            <Button
                buttonStyle="secondary"
                onClick={onClickButtonSecondary}
                to={buttonSecondaryTo}
                type={buttonSecondaryType}
                isInline={true}
                disabled={isButtonSecondaryDisabled}
            >
                {buttonSecondaryChildren}
            </Button>
            <Button
                buttonStyle="primary"
                onClick={onClickButtonPrimary}
                to={buttonPrimaryTo}
                type={buttonPrimarytype}
                isInline={true}
                disabled={isButtonPrimaryDisabled}
            >
                {buttonPrimaryChildren}
            </Button>
        </div>
    );
};

export default InlineButtonGroup;
