import { type MouseEventHandler } from 'react';

import Button from './Button';

type VerticalButtonGroupProps = {
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

const VerticalButtonGroup = ({
    className,
    onClickButtonPrimary,
    buttonPrimaryTo,
    buttonPrimarytype,
    buttonPrimaryChildren,
    onClickButtonSecondary,
    buttonSecondaryTo,
    buttonSecondaryType,
    buttonSecondaryChildren,
}: VerticalButtonGroupProps) => {
    return (
        <div className={className}>
            <Button
                buttonStyle="primary"
                onClick={onClickButtonPrimary}
                to={buttonPrimaryTo}
                type={buttonPrimarytype}
                className="!mb-2"
            >
                {buttonPrimaryChildren}
            </Button>
            <Button
                buttonStyle="secondary"
                onClick={onClickButtonSecondary}
                to={buttonSecondaryTo}
                type={buttonSecondaryType}
            >
                {buttonSecondaryChildren}
            </Button>
        </div>
    );
};

export default VerticalButtonGroup;
