// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import DescriptionList from '../../shared/content/rows-and-lists/DescriptionList';
import TextLinkList from '../../shared/content/rows-and-lists/TextLinkList';
import Checkbox from '../../shared/inputs/Checkbox';
import Mnemonic from '../../shared/inputs/Mnemonic';
import { LinkType } from '_src/enums/TypographyEnums';
import { ToS_LINK } from '_src/shared/constants';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { createMnemonic, setMnemonic } from '_src/ui/app/redux/slices/account';

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

    const onHandleCreate = useCallback(async () => {
        await dispatch(createMnemonic());
        navigate('../backup');
    }, [dispatch, navigate]);
    const creatingMnemonic = useAppSelector(({ account }) => account.creating);

    useEffect(() => {
        onHandleCreate();
    }, [onHandleCreate]);

    return (
        <>
            <DescriptionList
                labelAndDescriptions={[
                    {
                        label: 'Your recovery phrase',
                        description: (
                            <>
                                This phrase is the <strong>only</strong> way to
                                recover your wallet. Do not share it with
                                anyone!
                            </>
                        ),
                    },
                ]}
            />

            <Mnemonic mnemonic={mnemonic || ''} isReadOnly={true} />

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
                disabled={!hasSavedPhrase || creatingMnemonic}
            >
                <Loading loading={creatingMnemonic}>Continue</Loading>
            </Button>

            <TextLinkList
                textAndLinks={[
                    {
                        description:
                            'By creating a wallet, you have read and agreed to the',
                        link: {
                            type: LinkType.External,
                            to: ToS_LINK,
                            children: 'Terms of Service',
                        },
                    },
                ]}
            />
        </>
    );
};

export default BackupPage;
