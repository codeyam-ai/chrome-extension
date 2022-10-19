const PageScrollView = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className="h-[290px] overflow-y-scroll">{children}</div>;
};

export default PageScrollView;
