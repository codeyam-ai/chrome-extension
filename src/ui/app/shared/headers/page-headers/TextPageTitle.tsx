import Header from '../../typography/Header';

interface TextPageTitleProps {
    title: string;
    count?: number;
    padding?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

const TextPageTitle = ({
    title,
    count,
    padding = true,
    selected = true,
    onClick,
}: TextPageTitleProps) => {
    return (
        <div
            className={`${padding ? 'p-6' : ''} text-left ${
                onClick ? 'cursor-pointer' : ''
            }`}
            onClick={onClick}
        >
            <Header
                className={`flex gap-2 items-center ${
                    selected
                        ? ''
                        : 'font-light text-ethos-light-text-default dark:text-ethos-dark-text-default'
                }`}
            >
                <div>{title}</div>
                {count !== undefined && (
                    <div className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                        {count}
                    </div>
                )}
            </Header>
        </div>
    );
};

export default TextPageTitle;
