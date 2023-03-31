import { useCallback } from 'react';

import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';

const NextStep = ({ onNextStep }: { onNextStep: () => void }) => {
    const approve = useCallback(() => {
        onNextStep && onNextStep();
    }, [onNextStep]);

    const reject = useCallback(() => {
        console.log('REJECT!');
    }, []);

    return (
        <InlineButtonGroup
            onClickButtonPrimary={approve}
            buttonPrimaryTestId="approve"
            buttonPrimaryChildren={<>Next Step</>}
            onClickButtonSecondary={reject}
            buttonSecondaryTestId="reject"
            buttonSecondaryChildren={<>Cancel</>}
        />
    );
};

export default NextStep;
