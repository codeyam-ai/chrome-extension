import Title from '../../typography/Title';

interface TextPageTitleProps {
    title: string;
}

const TextPageTitle = ({ title }: TextPageTitleProps) => {
    return (
        <div className="py-4 px-6 text-left">
            <Title>{title}</Title>
        </div>
    );
};

export default TextPageTitle;
