const IconContainer = ({ children }: { children: JSX.Element }) => (
    <div
        className={
            'flex w-[40px] h-[40px] justify-center items-center bg-[#3D5FF2] rounded-full'
        }
    >
        {children}
    </div>
);

export default IconContainer;
