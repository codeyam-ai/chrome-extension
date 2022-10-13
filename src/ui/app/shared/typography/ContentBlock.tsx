export interface ContentBlockProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const ContentBlock = ({ className, children }: ContentBlockProps) => {
    const defaultClasses = 'flex flex-col gap-2 px-6 pb-2 text-left';
    return (
        <div className={`${className || ''} ${defaultClasses}`}>{children}</div>
    );
};

export default ContentBlock;
