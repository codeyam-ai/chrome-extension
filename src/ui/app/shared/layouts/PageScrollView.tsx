interface PageScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
    heightInPx?: number;
}

const PageScrollView = ({ heightInPx, children }: PageScrollViewProps) => {
    return <div className="h-[290px] overflow-scroll">{children}</div>;
};

export default PageScrollView;
