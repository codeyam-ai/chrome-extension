import { type MouseEventHandler } from 'react';
import Button, { type ButtonStyle } from './Button';

type VerticalButtonGroupProps = {
    className?: string;
    buttonOneStyle: ButtonStyle;
    onClickButtonOne?: MouseEventHandler<HTMLButtonElement>;
    buttonOneTo?: string;
    buttonOnetype?: 'button' | 'submit' | 'reset' | undefined;
    buttonOneChildren?: React.ReactNode;
    buttonTwoStyle: ButtonStyle;
    onClickButtonTwo?: MouseEventHandler<HTMLButtonElement>;
    buttonTwoTo?: string;
    buttonTwotype?: 'button' | 'submit' | 'reset' | undefined;
    buttonTwoChildren?: React.ReactNode;
};

const VerticalButtonGroup = ({
    className,
    buttonOneStyle,
    onClickButtonOne,
    buttonOneTo,
    buttonOnetype,
    buttonOneChildren,
    buttonTwoStyle,
    onClickButtonTwo,
    buttonTwoTo,
    buttonTwotype,
    buttonTwoChildren,
}: VerticalButtonGroupProps) => {
    return (
        <div className={className}>
            <Button
                buttonStyle={buttonOneStyle}
                onClick={onClickButtonOne}
                to={buttonOneTo}
                type={buttonOnetype}
                className="!mb-2"
            >
                {buttonOneChildren}
            </Button>
            <Button
                buttonStyle={buttonTwoStyle}
                onClick={onClickButtonTwo}
                to={buttonTwoTo}
                type={buttonTwotype}
            >
                {buttonTwoChildren}
            </Button>
        </div>
    );
};

export default VerticalButtonGroup;
