import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NameForm from './NameForm';
import SeedPhraseForm from './SeedPhraseForm';
import { useAppDispatch } from '_src/ui/app/hooks';

const ImportSeedPhrase = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [seedPhrase, setSeedPhrase] = useState<string | undefined>();
    const [name, setName] = useState<string>('');

    const save = useCallback(() => {
        // await dispatch(createMnemonic(formattedMnemonic));
        // dispatch(setMnemonic(formattedMnemonic));
        // navigate('/initialize/import/confirm');
    }, []);

    return (
        <div className="flex flex-col gap-6 py-6">
            <NameForm nameFor="Seed Phrase" name={name} onChange={setName} />
            <SeedPhraseForm onChange={setSeedPhrase} />
        </div>
    );
};

export default ImportSeedPhrase;
