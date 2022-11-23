import Typography, { type TypographyProps } from './Typography';

const Title = (props: TypographyProps) => {
    const titleClasses =
        'font-weight-ethos-title text-size-ethos-header leading-line-height-ethos-title tracking-letter-spacing-ethos-title';
    return (
        <Typography
            className={props.className + ' ' + titleClasses}
            as={props.as}
            textColor={props.textColor}
        >
            {props.children}
        </Typography>
    );
};

export default Title;
