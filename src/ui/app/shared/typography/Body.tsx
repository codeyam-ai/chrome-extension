import Typography, { type TypographyProps } from './Typography';

const Body = (props: TypographyProps) => {
    const bodyClasses =
        'font-weight-ethos-body text-size-ethos-body leading-line-height-ethos-body tracking-letter-spacing-ethos-body';
    return (
        <Typography
            className={props.className + ' ' + bodyClasses}
            as={props.as}
            textColor={props.textColor}
        >
            {props.children}
        </Typography>
    );
};

export default Body;
