import { type MouseEventHandler } from 'react';

import Button, { ButtonStyle } from './Button';

type InlineButtonGroupProps = {
    className?: string;
    onClickButtonPrimary?: MouseEventHandler<HTMLButtonElement>;
    buttonPrimaryTo?: string;
    buttonPrimarytype?: 'button' | 'submit' | 'reset' | undefined;
    buttonPrimaryChildren?: React.ReactNode;
    onClickButtonSecondary?: MouseEventHandler<HTMLButtonElement>;
    buttonSecondaryTo?: string;
    buttonSecondaryType?: 'button' | 'submit' | 'reset' | undefined;
    buttonSecondaryChildren?: React.ReactNode;
};

const InlineButtonGroup = ({
    className,
    onClickButtonPrimary,
    buttonPrimaryTo,
    buttonPrimarytype,
    buttonPrimaryChildren,
    onClickButtonSecondary,
    buttonSecondaryTo,
    buttonSecondaryType,
    buttonSecondaryChildren,
}: InlineButtonGroupProps) => {
    return (
        <div className={`${className || ''} grid grid-cols-2 gap-2 px-6`}>
            <Button
                buttonStyle={ButtonStyle.SECONDARY}
                onClick={onClickButtonSecondary}
                to={buttonSecondaryTo}
                type={buttonSecondaryType}
                isInline={true}
            >
                {buttonSecondaryChildren}
            </Button>
            <Button
                buttonStyle={ButtonStyle.PRIMARY}
                onClick={onClickButtonPrimary}
                to={buttonPrimaryTo}
                type={buttonPrimarytype}
                isInline={true}
            >
                {buttonPrimaryChildren}
            </Button>
        </div>
    );
};

export default InlineButtonGroup;
