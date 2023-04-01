import { useCallback } from 'react';

import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';

export type NextStepProps = {
    onNextStep: () => void;
    onCancel: () => void;
};

const Approve = ({ onNextStep, onCancel }: NextStepProps) => {
    const nextStep = useCallback(() => {
        onNextStep && onNextStep();
    }, [onNextStep]);

    const cancel = useCallback(() => {
        onCancel && onCancel();
    }, [onCancel]);

    return (
        <InlineButtonGroup
            onClickButtonPrimary={nextStep}
            buttonPrimaryTestId="approve"
            buttonPrimaryChildren={<>Approve</>}
            onClickButtonSecondary={cancel}
            buttonSecondaryTestId="reject"
            buttonSecondaryChildren={<>Cancel</>}
        />
    );
};

export default Approve;
