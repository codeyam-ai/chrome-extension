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
        <div className="flex flex-col items-center place-content-center">
            <div className="flex flex-col w-full items-center place-content-center p-6">
                <div
                    data-testid="emoji-picker"
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
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleEditContact}
                        className="flex items-center gap-2 rounded-xl py-3 px-5 bg-ethos-light-primary-light/20"
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
                        className="flex items-center gap-2 rounded-xl py-3 px-5 bg-ethos-light-primary-light/20"
                    >
                        <TrashIcon className="h-5 w-5 cursor-pointer text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />{' '}
                        <BodyLarge
                            isSemibold
                            className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                        >
                            Delete
                        </BodyLarge>
                    </button>
                    <button
                        onClick={handleSend}
                        className="flex items-center gap-2 rounded-xl py-2 px-4 bg-ethos-light-primary-light"
                    >
                        <ArrowRightIcon className="h-5 w-5 text-white" />
                        <BodyLarge isSemibold className="text-white">
                            Send
                        </BodyLarge>
                    </button>
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
