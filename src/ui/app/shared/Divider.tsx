const Divider = () => {
    return (
        <div className="relative w-full">
            <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
            >
                <div className="w-full border-t border-gray-300 dark:border-gray-500" />
            </div>
        </div>
    );
};

export default Divider;
