import Typography, { type TypographyProps } from './Typography';

const Header = (props: TypographyProps) => {
    const headerClasses =
        'font-weight-ethos-header text-size-ethos-header leading-line-height-ethos-header tracking-letter-spacing-ethos-header';
    return (
        <Typography
            {...props}
            className={props.className + ' ' + headerClasses}
        >
            {props.children}
        </Typography>
    );
};

export default Header;
