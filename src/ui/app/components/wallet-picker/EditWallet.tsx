import { useCallback, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../shared/buttons/Button';
import BasicSectionHeader from '../../shared/headers/section-headers/BasicSectionHeader';
import ColorPickerMenu from '../../shared/inputs/colors/ColorPickerMenu';
import ColorRow from '../../shared/inputs/colors/ColorRow';
import NavBarWithBackAndClose from '../../shared/navigation/nav-bar/NavBarWithBackAndClose';
import BodyLarge from '../../shared/typography/BodyLarge';
import { useNextWalletPickerUrl } from '../menu/hooks';
import Input from '../../shared/inputs/Input';
import { AccountInfo } from '../../KeypairVault';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { thunkExtras } from '../../redux/store/thunk-extras';
import {
    saveAccountInfos,
    saveActiveAccountIndex,
    setAccountInfos as setStateAccountInfos,
} from '../../redux/slices/account';
import Authentication from '_src/background/Authentication';
interface EditWalletProps {
    setIsWalletEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditWallet = ({ setIsWalletEditing }: EditWalletProps) => {
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const walletPickerHomeUrl = useNextWalletPickerUrl(true, '/');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);

    const _accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const walletIndex = searchParams.get('index')
        ? +searchParams.get('index')!
        : 0;
    const currentAccountInfo = _accountInfos[walletIndex];
    const draftAccountInfos = useRef<AccountInfo[]>(_accountInfos);
    const [accountInfos, setAccountInfos] = useState<AccountInfo[]>(
        draftAccountInfos.current
    );
    const [draftName, setDraftName] = useState<string>(
        currentAccountInfo.name || `Wallet ${currentAccountInfo.index + 1}`
    );

    const [draftColor, setDraftColor] = useState<string>(
        currentAccountInfo.color || '#7E23CA'
    );

    const authentication = useAppSelector(
        ({ account }) => account.authentication
    );
    const keypairVault = thunkExtras.keypairVault;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleIsColorPickerMenuOpen = useCallback(() => {
        setIsColorPickerMenuOpen(!isColorPickerMenuOpen);
    }, [isColorPickerMenuOpen]);

    const setIsWalletEditingToFalse = useCallback(() => {
        setIsWalletEditing(false);
    }, []);

    const setIsWalletEditingToTrue = useCallback(() => {
        setIsWalletEditing(true);
    }, []);

    const getAccountInfos = useCallback(async () => {
        if (authentication) return;

        if (draftAccountInfos.current.length === 0) {
            draftAccountInfos.current = [
                {
                    index: 0,
                    address: keypairVault.getAddress(0) || '',
                    seed: (keypairVault.getSeed(0) || '').toString(),
                },
            ];
        }

        const accountInfosWithAddresses = draftAccountInfos.current.map(
            (accountInfo: AccountInfo) => {
                const address =
                    accountInfo.address ||
                    keypairVault.getAddress(accountInfo.index) ||
                    '';
                return {
                    ...accountInfo,
                    address,
                };
            }
        );
        setAccountInfos(accountInfosWithAddresses);
    }, [authentication, keypairVault]);

    const _saveAccountInfos = useCallback(async () => {
        if (authentication) {
            Authentication.updateAccountInfos(draftAccountInfos.current);
            await dispatch(setStateAccountInfos(draftAccountInfos.current));
            setAccountInfos(draftAccountInfos.current);
        } else {
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            await dispatch(
                saveActiveAccountIndex(draftAccountInfos.current.length - 1)
            );
            getAccountInfos();
        }

        setIsWalletEditing(true);
        navigate(walletPickerHomeUrl);
    }, [authentication, dispatch, getAccountInfos]);

    const _cancelEdit = useCallback(() => {
        if (!Object.isFrozen(draftAccountInfos.current)) {
            draftAccountInfos.current.pop();
            setAccountInfos(draftAccountInfos.current);
        }

        // setEdit(false);
        setIsWalletEditing(true);
        navigate(walletPickerHomeUrl);
    }, []);

    const _handleChange = useCallback(
        ({ name, color }: { name?: string; color?: string }) => {
            draftAccountInfos.current = draftAccountInfos.current.map(
                (accountInfo: AccountInfo) => {
                    if (accountInfo.index === currentAccountInfo.index) {
                        return {
                            ...accountInfo,
                            name: name || accountInfo.name,
                            color: color || accountInfo.color,
                        };
                    } else {
                        return accountInfo;
                    }
                }
            );
        },
        []
    );

    const _handleNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newName = e.target.value;
            setDraftName(newName);
            _handleChange({ name: newName });
        },
        [_handleChange]
    );

    const _handleColorChange = useCallback(
        (colorResult: string) => {
            const color = colorResult;
            setDraftColor(color);
            _handleChange({ color });
            setIsColorPickerMenuOpen(false);
        },
        [_handleChange]
    );

    return (
        <>
            <NavBarWithBackAndClose
                backUrl={walletPickerHomeUrl}
                onClickBack={setIsWalletEditingToTrue}
                closeUrl={closeWalletPickerUrl}
                onClickClose={setIsWalletEditingToFalse}
            />
            <BasicSectionHeader text="Edit Wallet"></BasicSectionHeader>
            <div className="flex flex-col">
                <Input value={draftName} onChange={_handleNameChange} />
                <div className="flex justify-between items-center px-6 pb-6">
                    <BodyLarge isSemibold>Choose a Color</BodyLarge>
                    <div className="p-1 rounded-md border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        <div
                            className="w-12 h-12 rounded-sm cursor-pointer"
                            style={{ backgroundColor: draftColor }}
                            onClick={toggleIsColorPickerMenuOpen}
                        />
                    </div>
                </div>
                <div className="relative mx-6">
                    {isColorPickerMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="absolute -top-[223px] -left-[24px] w-[360px] h-[475px]"
                                onClick={toggleIsColorPickerMenuOpen}
                            />

                            <div className="absolute">
                                <ColorPickerMenu
                                    selectedColor={draftColor}
                                    setSelectedColor={_handleColorChange}
                                />
                            </div>
                        </>
                    )}
                </div>
                <Button buttonStyle="primary" onClick={_saveAccountInfos}>
                    Done
                </Button>
            </div>
        </>
    );
};

export default EditWallet;
