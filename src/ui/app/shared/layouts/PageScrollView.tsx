interface PageScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
    heightInPx?: number;
}

const PageScrollView = ({ heightInPx, children }: PageScrollViewProps) => {
    return (
        <div
            className={'h-[300px] overflow-auto no-scrollbar pb-10'}
            style={{ height: heightInPx + 'px' }}
        >
            {children}
        </div>
    );
};

export default PageScrollView;
