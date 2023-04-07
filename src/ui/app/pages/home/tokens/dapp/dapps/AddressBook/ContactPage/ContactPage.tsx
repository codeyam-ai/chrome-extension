import {
    ArrowRightIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AddressTooltip from './AddressTooltip';
import ContactTransactions from './ContactTransactions';
import ConfirmDeleteContactModal from '../ConfirmDeleteContactModal';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';
import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const ContactPage = () => {
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
        useState(false);
    const accountAddress = useAppSelector(({ account }) => account.address);
    const { address } = useParams();
    const { removeContact } = useUpdateContacts();
    const navigate = useNavigate();
    const contact = useAppSelector(({ contacts }) =>
        contacts.contacts.find((contact) => contact.address === address)
    );

    const closeConfirmationModal = useCallback(() => {
        setIsConfirmDeleteModalOpen(false);
    }, []);

    const handleRemoveContact = useCallback(() => {
        setIsConfirmDeleteModalOpen(true);
    }, []);

    const handleEditContact = useCallback(() => {
        if (!contact?.address) {
            return;
        }
        navigate(`/tokens/address-book/contact/edit/${contact.address}`);
    }, [contact?.address, navigate]);

    const removeThisContact = useCallback(() => {
        if (!contact?.address) {
            return;
        }
        removeContact(contact?.address);
        navigate(-1);
    }, [contact?.address, navigate, removeContact]);

    const handleSend = useCallback(() => {
        if (!contact?.address || !accountAddress) return;
        navigate(
            `/send/recipient?${new URLSearchParams({
                type: SUI_TYPE_ARG,
                to: contact?.address,
                disableToInput: 'true',
                hideWalletRecommendations: 'true',
            }).toString()}`
        );
    }, [accountAddress, contact?.address, navigate]);

    if (!contact) {
        return <div>Not found</div>;
    }

    return (
        <div className="flex flex-col h-full items-center place-content-center bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
            <div className="p-6 w-full">
                <div className="flex flex-col w-full items-center place-content-center py-7 px-6 rounded-2xl border border-ethos-light-purple dark:border-ethos-dark-text-stroke bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <div
                        className="flex w-20 h-20 mb-2 rounded-full items-center place-content-center"
                        style={{ backgroundColor: contact.color }}
                    >
                        <EmojiDisplay emoji={contact.emoji} sizeInPx={44} />
                    </div>
                    <BodyLarge isSemibold>{contact.name}</BodyLarge>
                    <AddressTooltip address={contact.address}>
                        <BodyLarge isTextColorMedium>
                            {truncateMiddle(contact.address)}{' '}
                            <Square2StackIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium inline" />
                        </BodyLarge>
                    </AddressTooltip>
                    <button
                        onClick={handleSend}
                        className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light"
                    >
                        <ArrowUpIcon className="h-5 w-5 text-white" />
                        <BodyLarge isSemibold className="text-white">
                            Send
                        </BodyLarge>
                    </button>
                    <div className="flex gap-2 w-full">
                        <button
                            onClick={handleEditContact}
                            className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-5 bg-ethos-light-primary-light/20"
                        >
                            <PencilIcon className="h-5 w-5 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                            <BodyLarge
                                isSemibold
                                className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                            >
                                Edit
                            </BodyLarge>
                        </button>
                        <button
                            onClick={handleRemoveContact}
                            className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-5 bg-ethos-light-primary-light/20"
                        >
                            <TrashIcon className="h-5 w-5 cursor-pointer text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />{' '}
                            <BodyLarge
                                isSemibold
                                className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                            >
                                Delete
                            </BodyLarge>
                        </button>
                    </div>
                </div>
            </div>
            <ContactTransactions contactAddress={contact.address} />
            <ConfirmDeleteContactModal
                isOpen={isConfirmDeleteModalOpen}
                setIsOpen={setIsConfirmDeleteModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={removeThisContact}
            />
        </div>
    );
};

export default ContactPage;
