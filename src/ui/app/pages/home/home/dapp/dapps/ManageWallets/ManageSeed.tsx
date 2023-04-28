import { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import KeypairVault from '_src/ui/app/KeypairVault';
import Loading from '_src/ui/app/components/loading';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    getImportedMnemonic,
    saveAccountInfos,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Header from '_src/ui/app/shared/typography/Header';
import WalletList from '_src/ui/app/shared/wallet-list/WalletList';

const ManageSeed = () => {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const [mnemonic, setMnemonic] = useState<string | undefined>();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');
    const { mnemonics } = useAppSelector(({ account }) => account.importNames);

    const relevantAccountInfos = useMemo(() => {
        return accountInfos.filter(
            (accountInfo) => accountInfo.importedMnemonicName === name
        );
    }, [accountInfos, name]);

    useEffect(() => {
        if (!name) return;
        const getMnenonic = async () => {
            const mnemonic = await dispatch(
                getImportedMnemonic({ name })
            ).unwrap();
            if (mnemonic) {
                setMnemonic(mnemonic);
            }
        };

        getMnenonic();
    }, [dispatch, name]);

    const createAddress = useCallback(async () => {
        if (!mnemonic || !name) return;
        const keypairVault = new KeypairVault();
        keypairVault.mnemonic = mnemonic;

        const baseIndex = (mnemonics.findIndex((m) => m === name) ?? 0) + 1;
        const nextIndex =
            (relevantAccountInfos.sort(
                (a, b) =>
                    (b.importedMnemonicIndex ?? 0) -
                    (a.importedMnemonicIndex ?? 0)
            )?.[0]?.importedMnemonicIndex ?? 0) + 1;
        const keypair = keypairVault.addKeyPair(nextIndex);

        const address = keypair.getPublicKey().toSuiAddress();

        const mutableAccountInfos = JSON.parse(JSON.stringify(accountInfos));
        mutableAccountInfos.push({
            index: baseIndex * 10000 + nextIndex,
            address,
            importedMnemonicName: name,
            importedMnemonicIndex: nextIndex,
        });

        await dispatch(saveAccountInfos(mutableAccountInfos));
    }, [
        mnemonic,
        name,
        mnemonics,
        relevantAccountInfos,
        accountInfos,
        dispatch,
    ]);

    const deleteMnemonic = useCallback(() => {
        if (
            typeof window !== 'undefined' &&
            window.confirm('Are you sure you want to delete this seed phrase?')
        ) {
            console.log('DELETE!');
        }
    }, []);

    return (
        <div className="p-6 gap-6 flex flex-col items-center">
            <Header>&#34;{name}&#34; Seed Phrase</Header>
            <Loading
                loading={!mnemonic}
                big
                className="flex justify-center py-6"
            >
                {mnemonic}
            </Loading>
            <WalletList
                hasTopPadding
                wallets={relevantAccountInfos}
                isWalletEditing={false}
            />
            <Button
                buttonStyle="primary"
                removeContainerPadding
                onClick={createAddress}
            >
                Create New Wallet Address
            </Button>
            <Button
                buttonStyle="secondary"
                removeContainerPadding
                onClick={deleteMnemonic}
            >
                Delete Seed Phrase
            </Button>
        </div>
    );
};

export default ManageSeed;
