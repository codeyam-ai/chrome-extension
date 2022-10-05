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
        <TextArea
            label="Recovery phrase"
            rows={3}
            value={mnemonic}
            id="mnemonic"
            name="mnemonic"
            onChange={onChange}
            onBlur={onBlur}
            disabled={isReadOnly || disabled}
            errorText={errorText}
        />
    );
};

export default Mnemonic;
