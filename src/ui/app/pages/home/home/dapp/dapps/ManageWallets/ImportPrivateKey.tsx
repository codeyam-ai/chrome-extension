import { fromHEX } from '@mysten/bcs';
import { Ed25519Keypair } from '@mysten/sui.js';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NameForm from './NameForm';
import PrivateKeyForm from './PrivateKeyForm';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    saveAccountInfos,
    saveImportedPrivateKey,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const IMPORTED_PRIVATE_KEY_BUFFER = 10_000;

const ImportPrivateKey = () => {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [privateKey, setPrivateKey] = useState<string>('');
    const [name, setName] = useState<string>('');

    const save = useCallback(async () => {
        if (privateKey.length === 0 || name.length === 0) return;
        await dispatch(saveImportedPrivateKey({ privateKey, name }));

        const keypair = Ed25519Keypair.fromSecretKey(fromHEX(privateKey));
        const address = keypair.getPublicKey().toSuiAddress();

        const baseIndex =
            accountInfos
                .filter((accountInfo) => !!accountInfo.importedPrivateKeyName)
                .sort((a, b) => b.index - a.index)?.[0]?.index ?? 0;

        const mutableAccountInfos: AccountInfo[] = JSON.parse(
            JSON.stringify(accountInfos)
        );
        const index = IMPORTED_PRIVATE_KEY_BUFFER + (baseIndex + 1);
        mutableAccountInfos.push({
            index,
            address,
            importedPrivateKeyName: name,
            color: getNextWalletColor(index),
            emoji: getNextEmoji(index),
            nickname: name,
        });

        await dispatch(saveAccountInfos(mutableAccountInfos));

        navigate('/home/manage-wallets/manage-private-key?name=' + name);
    }, [accountInfos, dispatch, name, navigate, privateKey]);

    return (
        <div className="flex flex-col gap-6 py-6">
            <NameForm nameFor="private key" name={name} onChange={setName} />
            <PrivateKeyForm privateKey={privateKey} onChange={setPrivateKey} />
            <div className="flex justify-center">
                <Button
                    disabled={privateKey.length === 0 || name.length === 0}
                    removeContainerPadding
                    onClick={save}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default ImportPrivateKey;
