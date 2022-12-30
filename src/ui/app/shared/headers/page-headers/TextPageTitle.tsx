import Header from '../../typography/Header';

interface TextPageTitleProps {
    title: string;
    count?: number;
    padding?: boolean;
    onClick?: () => void;
}

const TextPageTitle = ({
    title,
    count,
    padding = true,
    onClick,
}: TextPageTitleProps) => {
    return (
        <div
            className={`${padding ? 'p-6' : ''} text-left ${
                onClick ? 'cursor-pointer' : ''
            }`}
            onClick={onClick}
        >
            <Header>
                {title}
                {count && (
                    <span
                        className={
                            'pl-2 text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                        }
                    >
                        {count}
                    </span>
                )}
            </Header>
        </div>
    );
};

export default TextPageTitle;
