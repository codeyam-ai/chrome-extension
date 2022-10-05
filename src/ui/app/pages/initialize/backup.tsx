// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import Checkbox from '../../shared/inputs/Checkbox';
import Mnemonic from '../../shared/inputs/Mnemonic';
import BodyLarge from '../../shared/typography/BodyLarge';
import Title from '../../shared/typography/Title';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { setMnemonic } from '_src/ui/app/redux/slices/account';

import type { ChangeEventHandler } from 'react';

const BackupPage = () => {
    const [hasSavedPhrase, setHasSavedPhrase] = useState(false);
    const onHandleSavedPhrase = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        const checked = event.target.checked;
        setHasSavedPhrase(checked);
    }, []);
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleOnClick = useCallback(() => {
        if (mnemonic) {
            navigate('/');
            dispatch(setMnemonic(mnemonic));
        }
    }, [navigate, dispatch, mnemonic]);
    return (
        <>
            <img src={logo} className="h-36 mx-auto pb-3" alt="" />
            <Title as="h1" className="mb-4">
                Your Recovery Phrase
            </Title>
            <BodyLarge as="p" className="mb-2">
                This phrase is the <strong>only</strong> way to recover your
                wallet. Do not share it with anyone!
            </BodyLarge>

            <Mnemonic mnemonic={mnemonic || ''} />

            <Checkbox
                label="I saved my recovery phrase"
                id="save-phrase-check-description"
                onChange={onHandleSavedPhrase}
                checked={hasSavedPhrase}
            />

            <Button
                buttonStyle={ButtonStyle.PRIMARY}
                type="button"
                onClick={handleOnClick}
                disabled={!hasSavedPhrase}
            >
                Continue
            </Button>
        </>
    );
};

export default BackupPage;
