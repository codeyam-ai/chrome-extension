import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';
import { useCallback } from 'react';

const NextStep = () => {
    const approve = useCallback(() => {
        console.log('NextStep!');
    }, []);

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
