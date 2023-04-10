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
import Input from '_src/ui/app/shared/inputs/Input';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
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
            <Title className="pb-6">Choose your wallet&apos;s nickname</Title>
            <Input defaultValue={nickname} onChange={handleOnChange} />
            <div className="flex gap-2 w-full mt-2">
                <button
                    onClick={goBack}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light/20"
                >
                    <BodyLarge
                        isSemibold
                        className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                    >
                        Cancel
                    </BodyLarge>
                </button>
                <button
                    onClick={handleOnSave}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light"
                >
                    <BodyLarge isSemibold className="text-white">
                        {buttonText}
                    </BodyLarge>
                </button>
            </div>
            {/* <div className="flex gap-3 mt-3">
                <Button
                    removeContainerPadding
                    buttonStyle="secondary"
                    onClick={goBack}
                >
                    Cancel
                </Button>
                <Button removeContainerPadding onClick={handleOnSave}>
                    {buttonText}
                </Button>
            </div> */}
        </div>
    );
};

export default WalletNickname;
