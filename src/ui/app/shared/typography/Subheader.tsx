import Typography, { type TypographyProps } from './Typography';

const Subheader = (props: TypographyProps) => {
    const subheaderClasses =
        'font-weight-ethos-header text-size-ethos-subheader leading-line-height-ethos-subheader tracking-letter-spacing-ethos-subheader';
    return (
        <Typography
            className={props.className + ' ' + subheaderClasses}
            as={props.as}
            textColor={props.textColor}
        >
            {props.children}
        </Typography>
    );
};

export default Subheader;
