interface PageScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
    heightInPx?: number;
}

const PageScrollView = ({ heightInPx, children }: PageScrollViewProps) => {
    return (
        <div
            className={`h-[${
                heightInPx ? heightInPx.toString() : '290'
            }px] overflow-y-scroll`}
        >
            {children}
        </div>
    );
};

export default PageScrollView;
