const NumberedValue = ({ label, count }: { label: string; count: number }) => {
    return (
        <div className="flex flex-row items-center gap-1">
            <div>{label}</div>
            <div className="w-5 h-5 flex justify-center items-center font-normal bg-slate-200 text-slate-600 rounded-full">
                {count}
            </div>
        </div>
    );
};

export default NumberedValue;
