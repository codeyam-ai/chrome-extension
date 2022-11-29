export type NumberedDetail = {
    label: string;
    count: number;
};

const NumberedValue = ({ label, count }: { label: string; count: number }) => {
    return (
        <div
            className={`flex flex-row items-center gap-1 ${
                count === 0 ? 'opacity-30' : ''
            }`}
        >
            <div>{label}</div>
            {count > 0 && (
                <div className="w-5 h-5 flex justify-center items-center font-normal bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 rounded-full">
                    {count}
                </div>
            )}
        </div>
    );
};

export default NumberedValue;
