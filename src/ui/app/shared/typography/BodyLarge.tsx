import Typography, { type TypographyProps } from './Typography';

const BodyLarge = (props: TypographyProps) => {
    const bodyLargeClasses =
        'font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large';
    return (
        <Typography
            className={props.className + ' ' + bodyLargeClasses}
            as={props.as}
            textColor={props.textColor}
        >
            {props.children}
        </Typography>
    );
};

export default BodyLarge;
