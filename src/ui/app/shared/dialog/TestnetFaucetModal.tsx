import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useCallback } from 'react';

import { TooltipDirection } from '../../components/Tooltip';
import AccountAddress from '../../components/account-address';
import BodyLarge from '../typography/BodyLarge';
import EthosLink from '../typography/EthosLink';
import Title from '../typography/Title';

interface TestnetFaucetModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestnetFaucetModal = ({ isOpen, setIsOpen }: TestnetFaucetModalProps) => {
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-[328px] transform overflow-hidden rounded-[20px] text-center align-middle shadow-ethos-modal-box-shadow transition-all bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                                <div className="flex place-content-end pt-6 px-6">
                                    <button onClick={closeModal}>
                                        <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                                    </button>
                                </div>
                                <div className="flex flex-col pt-4 pb-8 px-6 gap-3 place-content-center place-items-center text-center">
                                    <Title
                                        as="h1"
                                        className="text-ethos-light-text-default dark:text-ethos-dark-text-default"
                                    >
                                        How to Get TestNet SUI
                                    </Title>
                                    <BodyLarge isTextColorMedium>
                                        To get TestNet SUI, join the <br />
                                        <EthosLink
                                            to="https://discord.gg/Sui"
                                            type="external"
                                        >
                                            Sui Discord
                                        </EthosLink>{' '}
                                        and drop your wallet address in the{' '}
                                        <code className="bg-black/20 rounded-sm px-1">
                                            #testnet-faucet
                                        </code>{' '}
                                        channel.
                                    </BodyLarge>
                                    <BodyLarge isTextColorMedium>
                                        Your wallet address:
                                        <AccountAddress
                                            showName={false}
                                            showLink={false}
                                            tooltipDirection={
                                                TooltipDirection.RIGHT
                                            }
                                        />
                                    </BodyLarge>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TestnetFaucetModal;
