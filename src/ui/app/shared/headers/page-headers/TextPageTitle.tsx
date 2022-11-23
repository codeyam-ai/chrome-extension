import Title from '../../typography/Title';

interface TextPageTitleProps {
    title: string;
    count?: number;
}

const TextPageTitle = ({ title, count }: TextPageTitleProps) => {
    return (
        <div className="p-6 text-left">
            <Title>
                {title}
                {count && (
                    <span className={'pl-2 text-ethos-light-text-medium'}>
                        {count}
                    </span>
                )}
            </Title>
        </div>
    );
};

export default TextPageTitle;
