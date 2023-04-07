import {
    type ChangeEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '_src/ui/app/KeypairVault';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateCurrentAccountInfo } from '_src/ui/app/hooks/useUpdateCurrentAccountInfo';
import Button from '_src/ui/app/shared/buttons/Button';
import Input from '_src/ui/app/shared/inputs/Input';
import Title from '_src/ui/app/shared/typography/Title';

const WalletNickname: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [buttonText, setButtonText] = useState('Continue');
    const { updateCurrentAccountInfo } = useUpdateCurrentAccountInfo();
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const navigate = useNavigate();

    const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            setNickname(event.target.value);
            setButtonText('Save');
        },
        []
    );

    const handleOnSave = useCallback(() => {
        updateCurrentAccountInfo({ name: nickname });
        navigate('/tokens/customize/emoji');
    }, [nickname, updateCurrentAccountInfo, navigate]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(() => {
        if (accountInfo) {
            setNickname(accountInfo.name || '');
        }
    }, [accountInfo]);

    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">Choose a nickname for your wallet</Title>
            <Input defaultValue={nickname} onChange={handleOnChange} />
            <div className="flex flex-col gap-2">
                <Button removeContainerPadding onClick={handleOnSave}>
                    {buttonText}
                </Button>
                <Button
                    removeContainerPadding
                    buttonStyle="secondary"
                    onClick={goBack}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default WalletNickname;
