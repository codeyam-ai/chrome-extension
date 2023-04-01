import { useCallback } from 'react';

const Steps = ({
    stepCount,
    activeStep,
    onClick,
}: {
    stepCount: number;
    activeStep: number;
    onClick: (index: number) => void;
}) => {
    const Step = ({
        index,
        onClick,
    }: {
        index: number;
        onClick: (index: number) => void;
    }) => {
        const _onClick = useCallback(() => {
            if (activeStep === index) return;

            onClick(index);
        }, [onClick, index]);

        return (
            <div
                className={`h-3 w-3 rounded-full ${
                    activeStep === index
                        ? 'bg-[#9040F5]'
                        : 'bg-[#EBE4FD] cursor-pointer'
                }`}
                onClick={_onClick}
            />
        );
    };

    return (
        <div className="w-full flex justify-center gap-3">
            {[...Array(stepCount).keys()].map((_, index) => (
                <Step key={`step-${index}`} index={index} onClick={onClick} />
            ))}
        </div>
    );
};

export default Steps;
