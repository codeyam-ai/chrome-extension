import TextArea from './TextArea';

type MnemonicProps = {
    mnemonic: string;
};

const Mnemonic = ({ mnemonic }: MnemonicProps) => {
    return (
        <TextArea
            label="Recovery phrase"
            rows={3}
            value={mnemonic}
            id="mnemonic"
            name="mnemonic"
            disabled={true}
        />
    );
};

export default Mnemonic;
