interface PageScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
    heightInPx?: number;
}

const PageScrollView = ({ heightInPx, children }: PageScrollViewProps) => {
    return (
        <div className="h-[350px] overflow-auto no-scrollbar pb-10">
            {children}
        </div>
    );
};

export default PageScrollView;
