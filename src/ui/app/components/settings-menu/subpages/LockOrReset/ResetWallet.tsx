import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const ResetWallet = () => {
    const dispatch = useAppDispatch();
    const { passphrase } = useAppSelector(({ account }) => account);
    const [password, setPassword] = useState('');

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        [setPassword]
    );

    const reset = useCallback(async () => {
        if (password !== passphrase) return;
        if (window.confirm('Are you sure you want to reset your wallet?')) {
            await dispatch(resetWallet());
        }
    }, [dispatch, password, passphrase]);

    return (
        <div className="py-6 flex flex-col gap-6">
            <ContentBlock>
                <Header>Reset Ethos</Header>
                <Body isTextColorMedium>
                    Resetting Ethos will delete all of your wallets and
                    information. This can not be be undone. Please proceed with
                    caution.
                </Body>
            </ContentBlock>
            <div className="flex justify-center items-center gap-3">
                <input
                    type="password"
                    placeholder="Enter password"
                    className="border rounded-lg p-3 dark:bg-ethos-dark-background-secondary"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    buttonStyle="primary"
                    onClick={reset}
                    removeContainerPadding
                    disabled={passphrase !== password}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default ResetWallet;
