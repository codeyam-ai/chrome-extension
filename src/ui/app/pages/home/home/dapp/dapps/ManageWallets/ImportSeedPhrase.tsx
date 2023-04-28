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
        // navigate('/initialize/import/confirm');
    }, []);

    return (
        <div className="flex flex-col gap-6 py-6">
            <NameForm nameFor="seed phrase" name={name} onChange={setName} />
            <SeedPhraseForm onChange={setSeedPhrase} />
            <Button
                disabled={!seedPhrase || name.length === 0}
                removeContainerPadding
            >
                Save
            </Button>
        </div>
    );
};

export default ImportSeedPhrase;
