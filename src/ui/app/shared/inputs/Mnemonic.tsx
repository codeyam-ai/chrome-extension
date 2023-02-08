import { type FocusEventHandler } from 'react';

import TextArea from './TextArea';

type MnemonicProps = {
    mnemonic: string;
    isReadOnly: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    errorText?: string;
};

const Mnemonic = ({
    mnemonic,
    isReadOnly,
    onChange,
    onBlur,
    disabled,
    errorText,
}: MnemonicProps) => {
    return (
        <div className="mx-6 mb-6">
            <TextArea
                label="Recovery phrase"
                rows={2}
                value={mnemonic}
                id="mnemonic"
                name="mnemonic"
                onChange={onChange}
                onBlur={onBlur}
                disabled={isReadOnly || disabled}
                errorText={errorText}
            />
        </div>
    );
};

export default Mnemonic;
