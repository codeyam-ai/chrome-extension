import Typography, { type TypographyProps } from './Typography';

export interface BodyProps extends TypographyProps {
    isSemibold?: boolean;
}

const Body = ({ isSemibold, ...props }: BodyProps) => {
    const fontWeightClass = isSemibold
        ? 'font-weight-ethos-semibold-body'
        : 'font-weight-ethos-body';
    const bodyClasses =
        fontWeightClass +
        ' ' +
        'text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body';
    return (
        <Typography
            {...props}
            className={`${props.className || ''} ${bodyClasses}`}
        >
            {props.children}
        </Typography>
    );
};

export default Body;
