import Typography, { type TypographyProps } from './Typography';

const Header = (props: TypographyProps) => {
    const headerClasses =
        'font-weight-ethos-header text-size-ethos-header leading-line-height-ethos-header tracking-letter-spacing-ethos-header';
    return (
        <Typography
            className={props.className + ' ' + headerClasses}
            as={props.as}
            textColor={props.textColor}
        >
            {props.children}
        </Typography>
    );
};

export default Header;
