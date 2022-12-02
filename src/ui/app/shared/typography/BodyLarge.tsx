import Typography, { type TypographyProps } from './Typography';

interface BodyLargeProps extends TypographyProps {
    isSemibold?: boolean;
}

const BodyLarge = ({ isSemibold, ...props }: BodyLargeProps) => {
    const fontWeightClass = isSemibold
        ? 'font-weight-ethos-semibold-body'
        : 'font-weight-ethos-body-large';
    const bodyLargeClasses =
        fontWeightClass +
        ' ' +
        'text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large';

    const displayClasses = props.className
        ? props.className + ' ' + bodyLargeClasses
        : bodyLargeClasses;

    return (
        <Typography
            className={displayClasses}
            as={props.as}
            isTextColorMedium={props.isTextColorMedium}
        >
            {props.children}
        </Typography>
    );
};

export default BodyLarge;
