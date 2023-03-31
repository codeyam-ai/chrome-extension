import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';
import { useCallback } from 'react';

const Continue = () => {
    const approve = useCallback(() => {
        console.log('CONTINUE!');
    }, []);

    const reject = useCallback(() => {
        console.log('REJECT!');
    }, []);

    return (
        <InlineButtonGroup
            onClickButtonPrimary={approve}
            buttonPrimaryTestId="approve"
            buttonPrimaryChildren={<>Continue</>}
            onClickButtonSecondary={reject}
            buttonSecondaryTestId="reject"
            buttonSecondaryChildren={<>Cancel</>}
        />
    );
};

export default Continue;
