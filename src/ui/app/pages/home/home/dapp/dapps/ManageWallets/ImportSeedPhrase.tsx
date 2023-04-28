import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NameForm from './NameForm';
import SeedPhraseForm from './SeedPhraseForm';
import { useAppDispatch } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import { createMnemonic } from '_src/ui/app/redux/slices/account';

const ImportSeedPhrase = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [seedPhrase, setSeedPhrase] = useState<string | undefined>();
    const [name, setName] = useState<string>('');

    const save = useCallback(async () => {
        await dispatch(createMnemonic({ existingMnemonic: seedPhrase, name }));
        // dispatch(setMnemonic(formattedMnemonic));
        navigate('/home/manage-wallets/manage-seed?name=' + name);
    }, [dispatch, name, navigate, seedPhrase]);

    console.log('seedPhrase', seedPhrase, name);
    return (
        <div className="flex flex-col gap-6 py-6">
            <NameForm nameFor="seed phrase" name={name} onChange={setName} />
            <SeedPhraseForm onChange={setSeedPhrase} />
            <div className="flex justify-center">
                <Button
                    disabled={!seedPhrase || name.length === 0}
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
