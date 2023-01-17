import { Link } from 'react-router-dom';

import BodyLarge from '../typography/BodyLarge';

import type { ReactNode } from 'react';

export interface OnboardingButtonProps {
    title: string;
    to?: string;
    linkType: 'external' | 'internal' | 'none';
    onClick?: () => void;
    onMouseOver?: () => void;
    iconWithNoClasses: ReactNode;
    iconBackgroundColor: string;
    buttonGradientColor: string;
    disabled?: boolean;
}

const OnboardingButton = ({
    title,
    to,
    linkType,
    onClick,
    onMouseOver,
    iconWithNoClasses,
    iconBackgroundColor,
    buttonGradientColor,
    disabled,
}: OnboardingButtonProps) => {
    const buttonContent = (
        <>
            <BodyLarge isSemibold>{title}</BodyLarge>
            <div
                className="flex place-content-center place-items-center h-8 w-8 rounded-lg"
                style={{ backgroundColor: iconBackgroundColor }}
            >
                <span className="flex place-content-center place-items-center h-5 w-5 text-ethos-light-background-default">
                    {iconWithNoClasses}
                </span>
            </div>
        </>
    );
    const buttonStyle = {
        background: `linear-gradient(90deg, #F2F2F2 0%, ${buttonGradientColor} 100%)`,
    };
    const buttonClasses =
        'flex py-4 pl-5 pr-4 justify-between items-center rounded-2xl disabled:opacity-50';

    if (disabled) {
        return (
            <button disabled className={buttonClasses} style={buttonStyle}>
                {buttonContent}
            </button>
        );
    }

    return (
        <>
            {linkType === 'internal' && to ? (
                <Link
                    to={to}
                    onClick={onClick}
                    className={buttonClasses}
                    style={buttonStyle}
                >
                    {buttonContent}
                </Link>
            ) : linkType === 'external' && to ? (
                <a
                    href={to}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onClick}
                    onMouseOver={onMouseOver}
                    className={buttonClasses}
                    style={buttonStyle}
                >
                    {buttonContent}
                </a>
            ) : (
                <button
                    onClick={onClick}
                    className={buttonClasses}
                    style={buttonStyle}
                >
                    {buttonContent}
                </button>
            )}
        </>
    );
};

export default OnboardingButton;
