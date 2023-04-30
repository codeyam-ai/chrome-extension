import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NameForm from './NameForm';
import SeedPhraseForm from './SeedPhraseForm';
import { useAppDispatch } from '_src/ui/app/hooks';
import { saveImportedMnemonic } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';

const ImportSeedPhrase = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [mnemonic, setMnemonic] = useState<string | undefined>();
    const [name, setName] = useState<string>('');

    const save = useCallback(async () => {
        if (!mnemonic || name.length === 0) return;
        await dispatch(saveImportedMnemonic({ mnemonic, name }));
        navigate('/home/manage-wallets/manage-seed?name=' + name);
    }, [dispatch, mnemonic, name, navigate]);

    return (
        <div className="flex flex-col gap-6 py-6">
            <NameForm nameFor="seed phrase" name={name} onChange={setName} />
            <SeedPhraseForm onChange={setMnemonic} />
            <div className="flex justify-center">
                <Button
                    disabled={!mnemonic || name.length === 0}
                    removeContainerPadding
                    onClick={save}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default ImportSeedPhrase;
