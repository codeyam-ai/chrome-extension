export type Cost = {
    value: string;
    symbol: string;
    dollars: string;
    total?: boolean;
};

const CostValue = ({ value, symbol, dollars, total }: Cost) => {
    return (
        <div
            className={`flex flex-row items-center gap-1 py-1 ${
                total ? 'font-semibold' : 'font-normal'
            }`}
        >
            <div className="text-slate-500">
                {value} {symbol}
            </div>
            <Dot />
            <div>{dollars}</div>
        </div>
    );
};

export const Dot = () => (
    <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3.02983 5.13068C2.62879 5.13068 2.26255 5.03291 1.93111 4.83736C1.59967 4.63849 1.33452 4.37334 1.13565 4.0419C0.940104 3.71046 0.84233 3.34422 0.84233 2.94318C0.84233 2.53883 0.940104 2.17259 1.13565 1.84446C1.33452 1.51302 1.59967 1.24953 1.93111 1.05398C2.26255 0.855113 2.62879 0.755682 3.02983 0.755682C3.43419 0.755682 3.80043 0.855113 4.12855 1.05398C4.45999 1.24953 4.72348 1.51302 4.91903 1.84446C5.1179 2.17259 5.21733 2.53883 5.21733 2.94318C5.21733 3.34422 5.1179 3.71046 4.91903 4.0419C4.72348 4.37334 4.45999 4.63849 4.12855 4.83736C3.80043 5.03291 3.43419 5.13068 3.02983 5.13068Z"
            fill="#74777C"
        />
    </svg>
);

export default CostValue;
