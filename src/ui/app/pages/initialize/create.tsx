// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import BackButton from './BackButton';
import ExternalLink from '_components/external-link';
import { ToS_LINK } from '_shared/constants';
import Loading from '_src/ui/app/components/loading';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { createMnemonic } from '_src/ui/app/redux/slices/account';
import Title from '../../shared/typography/Title';
import BodyLarge from '../../shared/typography/BodyLarge';
import { TextColor, LinkType } from '_src/enums/TypographyEnums';
import Body from '../../shared/typography/Body';
import EthosLink from '../../shared/typography/EthosLink';

const CreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleCreate = useCallback(async () => {
        await dispatch(createMnemonic());
        navigate('../backup');
    }, [dispatch, navigate]);
    const creatingMnemonic = useAppSelector(({ account }) => account.creating);
    return (
        <>
            <BackButton to="/" />
            <img src={logo} className="h-36 mx-auto pb-3" alt="" />
            <Title as="h1" className="mb-4">
                Create a Wallet
            </Title>
            <BodyLarge className="mb-2">
                Creating a wallet generates a recovery phrase. Using it you can
                restore the wallet.
            </BodyLarge>
            <Button
                buttonStyle={ButtonStyle.PRIMARY}
                type="button"
                onClick={onHandleCreate}
                disabled={creatingMnemonic}
            >
                <Loading loading={creatingMnemonic}>Create</Loading>
            </Button>
            <Body as="p" textColor={TextColor.Medium}>
                By creating a wallet, you have read and agreed to the{' '}
                <EthosLink type={LinkType.External} to={ToS_LINK}>
                    Terms of Service
                </EthosLink>
            </Body>
        </>
    );
};

export default CreatePage;
