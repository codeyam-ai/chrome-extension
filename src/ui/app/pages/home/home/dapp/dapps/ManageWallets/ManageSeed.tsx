import { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';
import Loading from '_src/ui/app/components/loading';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    deleteImportedMnemonic,
    getImportedMnemonic,
    saveAccountInfos,
} from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import CopyBody from '_src/ui/app/shared/typography/CopyBody';
import Header from '_src/ui/app/shared/typography/Header';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import WalletList from '_src/ui/app/shared/wallet-list/WalletList';

const IMPORTED_SEED_BUFFER = 100_000;

const ManageSeed = () => {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const [mnemonic, setMnemonic] = useState<string | undefined>();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const name = new URLSearchParams(location.search).get('name');
    const {
        importNames: { mnemonics },
        passphrase,
    } = useAppSelector(({ account }) => account);
    const [password, setPassword] = useState('');
    const [showSeedPhrase, setShowSeedPhrase] = useState(false);

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [setPassword]
    );

    const toggleShowSeedPhrase = useCallback(async () => {
        if (passphrase !== password) {
            return;
        }

        setShowSeedPhrase((prev) => !prev);
    }, [passphrase, password]);

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

        let baseIndex = mnemonics.findIndex((m) => m === name);
        if (baseIndex === -1) baseIndex = 0;
        const nextIndex =
            (relevantAccountInfos.sort(
                (a, b) =>
                    (b.importedMnemonicIndex ?? 0) -
                    (a.importedMnemonicIndex ?? 0)
            )?.[0]?.importedMnemonicIndex ?? -1) + 1;
        const keypair = keypairVault.addKeyPair(nextIndex);

        const address = keypair.getPublicKey().toSuiAddress();

        const mutableAccountInfos: AccountInfo[] = JSON.parse(
            JSON.stringify(accountInfos)
        );
        const index = (baseIndex + 1) * IMPORTED_SEED_BUFFER + nextIndex;
        mutableAccountInfos.push({
            index,
            address,
            publicKey: keypair.getPublicKey().toBase64(),
            importedMnemonicName: name,
            importedMnemonicIndex: nextIndex,
            color: getNextWalletColor(index),
            emoji: getNextEmoji(index),
            nickname: `${name} ${nextIndex + 1}`,
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

    const deleteMnemonic = useCallback(async () => {
        if (!name) return;
        if (
            typeof window !== 'undefined' &&
            window.confirm('Are you sure you want to delete this seed phrase?')
        ) {
            await dispatch(deleteImportedMnemonic({ name }));
            navigate('/home/manage-wallets');
        }
    }, [dispatch, name, navigate]);

    return (
        <div className="p-6 gap-6 flex flex-col items-center">
            <Header>&#34;{name}&#34; Seed Phrase</Header>
            <Loading
                loading={!mnemonic}
                big
                className="flex flex-col justify-center items-center gap-6"
            >
                {relevantAccountInfos.length === 0 && (
                    <Body className="px-6">
                        You haven&#39;t loaded any wallet addresses from this
                        seed phrase yet.
                    </Body>
                )}
                <WalletList
                    hasTopPadding
                    wallets={relevantAccountInfos}
                    isWalletEditing={false}
                    destination="/home"
                />
                <Button
                    buttonStyle="primary"
                    removeContainerPadding
                    onClick={createAddress}
                >
                    Load Next Wallet Address
                </Button>
                <Button
                    buttonStyle="secondary"
                    removeContainerPadding
                    onClick={deleteMnemonic}
                >
                    Delete Seed Phrase
                </Button>

                <div className="m-3 border rounded-lg p-3 flex flex-col gap-3 items-center">
                    <Subheader>Show Seed Phrase</Subheader>

                    <Body>
                        Enter your password to reveal this seed phrase. Be
                        careful not to let anyone see it.
                    </Body>

                    <div className="flex items-center gap-3">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="border rounded-lg p-3 dark:bg-ethos-dark-background-secondary"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            buttonStyle="primary"
                            onClick={toggleShowSeedPhrase}
                            removeContainerPadding
                            disabled={passphrase !== password}
                        >
                            Show
                        </Button>
                    </div>

                    {showSeedPhrase && (
                        <>
                            <CopyBody txt={mnemonic ?? ''}>{mnemonic}</CopyBody>
                            <Button
                                buttonStyle="secondary"
                                onClick={toggleShowSeedPhrase}
                            >
                                Hide
                            </Button>
                        </>
                    )}
                </div>
            </Loading>
        </div>
    );
};

export default ManageSeed;
