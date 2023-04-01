import { useCallback } from 'react';

import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';

export type NextStepProps = {
    onApprove: () => void;
    onCancel: () => void;
};

const Approve = ({ onApprove, onCancel }: NextStepProps) => {
    const approve = useCallback(() => {
        onApprove && onApprove();
    }, [onApprove]);

    const cancel = useCallback(() => {
        onCancel && onCancel();
    }, [onCancel]);

    return (
        <InlineButtonGroup
            onClickButtonPrimary={approve}
            buttonPrimaryTestId="approve"
            buttonPrimaryChildren={<>Approve</>}
            onClickButtonSecondary={cancel}
            buttonSecondaryTestId="reject"
            buttonSecondaryChildren={<>Cancel</>}
        />
    );
};

export default Approve;
