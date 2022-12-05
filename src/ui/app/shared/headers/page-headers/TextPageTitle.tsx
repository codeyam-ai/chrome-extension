import Header from '../../typography/Header';

interface TextPageTitleProps {
    title: string;
    count?: number;
}

const TextPageTitle = ({ title, count }: TextPageTitleProps) => {
    return (
        <div className="p-6 text-left">
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
