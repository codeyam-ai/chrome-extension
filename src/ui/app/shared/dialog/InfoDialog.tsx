import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, useCallback } from 'react';

import HeaderWithIcons from '_src/ui/app/shared/headers/page-headers/HeaderWithIcons';
import Button from '../buttons/Button';
import Title from '../typography/Title';
import BodyLarge from '../typography/BodyLarge';

interface ConfirmDestructiveActionDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    paragraphs: string[];
    primaryButtonText?: string;
    iconWithNoClasses?: React.ReactNode;
}

const InfoDialog = ({
    isOpen,
    setIsOpen,
    title,
    paragraphs,
    primaryButtonText,
    iconWithNoClasses,
}: ConfirmDestructiveActionDialogProps) => {
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[999]"
                    onClose={closeModal}
                >
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
                                <Dialog.Panel className="w-[328px] transform overflow-hidden rounded-[20px] text-center align-middle shadow-ethos-modal-box-shadow transition-all bg-ethos-light-background-default dark:bg-ethos-dark-background-default dark:border dark:border-ethos-dark-text-stroke">
                                    <div className="flex place-content-end pt-6 px-6">
                                        <button onClick={closeModal}>
                                            <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col py-3 px-6 gap-3 items-center text-center">
                                        {iconWithNoClasses && (
                                            <div className="relative flex w-[56px] h-[56px] rounded-2xl justify-center items-center bg-ethos-light-primary-light/10 dark:bg-ethos-dark-primary-dark/10">
                                                <span className="h-8 w-8 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark">
                                                    {iconWithNoClasses}
                                                </span>
                                                {/* <TrashIcon className="h-8 w-8 text-ethos-light-red dark:text-ethos-dark-red" /> */}
                                            </div>
                                        )}
                                        <Title
                                            as="h1"
                                            className="text-ethos-light-text-default dark:text-ethos-dark-text-default"
                                        >
                                            {title}
                                        </Title>

                                        {paragraphs.map((paragraph, index) => (
                                            <BodyLarge
                                                key={index}
                                                isTextColorMedium
                                            >
                                                {paragraph}
                                            </BodyLarge>
                                        ))}
                                    </div>

                                    {primaryButtonText ? (
                                        <Button
                                            onClick={closeModal}
                                            buttonStyle="secondary"
                                        >
                                            {primaryButtonText}
                                        </Button>
                                    ) : (
                                        <div className="h-6" />
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default InfoDialog;
