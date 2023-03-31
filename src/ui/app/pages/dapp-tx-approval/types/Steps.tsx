const Steps = ({
    stepCount,
    activeStep,
}: {
    stepCount: number;
    activeStep: number;
}) => {
    return (
        <div className="w-full flex justify-center gap-3">
            {[...Array(stepCount).keys()].map((_, index) => (
                <div
                    key={`step-${index}`}
                    className={`h-3 w-3 rounded-full ${
                        activeStep === index ? 'bg-[#9040F5]' : 'bg-[#EBE4FD]'
                    }`}
                />
            ))}
        </div>
    );
};

export default Steps;
