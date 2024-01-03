import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Fragment, useCallback } from 'react';

import Button from '../buttons/Button';
import BodyLarge from '../typography/BodyLarge';
import Title from '../typography/Title';

interface ZkLoginWarningDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    paragraphs: string[];
    primaryButtonText?: string;
    onClickPrimaryButton?: () => void;
    iconWithNoClasses?: React.ReactNode;
    forceLightTheme?: boolean;
}

const ZkLoginWarningDialog = ({
    isOpen,
    setIsOpen,
    title,
    paragraphs,
    primaryButtonText,
    onClickPrimaryButton,
    iconWithNoClasses,
    forceLightTheme,
}: ZkLoginWarningDialogProps) => {
    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const _onClickPrimaryButton = useCallback(() => {
        closeModal();
        if (onClickPrimaryButton) {
            onClickPrimaryButton();
        }
    }, [closeModal, onClickPrimaryButton]);

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
                        <div
                            className={classNames(
                                'fixed inset-0 bg-black bg-opacity-25',
                                !forceLightTheme ? 'dark:bg-opacity-50' : ''
                            )}
                        />
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
                                <Dialog.Panel
                                    className={classNames(
                                        'w-[440px] transform overflow-hidden rounded-[20px] text-center align-middle shadow-ethos-modal-box-shadow transition-all bg-ethos-light-background-default',
                                        !forceLightTheme
                                            ? 'dark:bg-ethos-dark-background-default dark:border dark:border-ethos-dark-text-stroke'
                                            : ''
                                    )}
                                >
                                    <div className="flex place-content-end pt-6 px-6">
                                        <button onClick={closeModal}>
                                            <XMarkIcon
                                                className={classNames(
                                                    'h-5 w-5 text-ethos-light-text-medium',
                                                    !forceLightTheme
                                                        ? 'dark:text-ethos-dark-text-medium'
                                                        : ''
                                                )}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex flex-col py-3 px-6 gap-3 items-center text-center">
                                        {iconWithNoClasses && (
                                            <div
                                                className={classNames(
                                                    'relative flex w-[56px] h-[56px] rounded-2xl justify-center items-center bg-ethos-light-primary-light/10',
                                                    !forceLightTheme
                                                        ? 'dark:bg-ethos-dark-primary-dark/10'
                                                        : ''
                                                )}
                                            >
                                                <span
                                                    className={classNames(
                                                        'h-8 w-8 text-ethos-light-primary-light',
                                                        !forceLightTheme
                                                            ? 'dark:text-ethos-dark-primary-dark'
                                                            : ''
                                                    )}
                                                >
                                                    {iconWithNoClasses}
                                                </span>
                                            </div>
                                        )}
                                        <Title
                                            as="h1"
                                            className={classNames(
                                                'text-ethos-light-text-default',
                                                !forceLightTheme
                                                    ? 'dark:text-ethos-dark-text-default'
                                                    : ''
                                            )}
                                        >
                                            {title}
                                        </Title>

                                        {paragraphs.map((paragraph, index) => (
                                            <BodyLarge key={index}>
                                                {paragraph}
                                            </BodyLarge>
                                        ))}
                                    </div>

                                    {primaryButtonText ? (
                                        <Button
                                            onClick={_onClickPrimaryButton}
                                            buttonStyle="secondary"
                                            forceLightTheme={forceLightTheme}
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

export default ZkLoginWarningDialog;
