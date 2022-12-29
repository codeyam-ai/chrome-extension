import Typography, { type TypographyProps } from './Typography';

const JumboTitle = (props: TypographyProps) => {
    const titleClasses =
        'font-weight-ethos-jumbo-title text-size-ethos-jumbo-title leading-line-height-ethos-jumbo-title tracking-letter-spacing-ethos-jumbo-title';
    return (
        <Typography {...props} className={props.className + ' ' + titleClasses}>
            {props.children}
        </Typography>
    );
};

export default JumboTitle;
