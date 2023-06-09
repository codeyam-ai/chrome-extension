import {
    useCallback,
    useEffect,
    useState,
    type ChangeEventHandler,
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
    const [buttonText, setButtonText] = useState('Next');
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

    const handleOnContinue = useCallback(() => {
        updateCurrentAccountInfo({ name: nickname });
        navigate('/home/customize/profile-picture');
    }, [nickname, updateCurrentAccountInfo, navigate]);

    useEffect(() => {
        if (accountInfo) {
            setNickname(accountInfo.name || '');
        }
    }, [accountInfo]);

    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">Choose your wallet&apos;s nickname</Title>
            <Input defaultValue={nickname} onChange={handleOnChange} />
            <Button
                onClick={handleOnContinue}
                wrapperClassName="w-full"
                isInline
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default WalletNickname;
