import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import EmojiDisplay from '_src/ui/app/shared/EmojiDisplay';
import Body from '_src/ui/app/shared/typography/Body';

import type { Contact } from '_src/ui/app/redux/slices/contacts';

interface ContactListItemProps {
    contact: Contact;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
    const navigate = useNavigate();

    const handleViewContact = useCallback(() => {
        navigate(`contact/${contact.address}`);
    }, [contact.address, navigate]);

    return (
        <button
            onClick={handleViewContact}
            className="flex justify-between w-full px-6 py-3 hover:bg-ethos-light-gray hover:dark:bg-ethos-dark-background-secondary"
        >
            <div className="flex gap-2">
                <div
                    data-testid="emoji-picker"
                    className="flex w-11 h-11 rounded-full items-center place-content-center"
                    style={{ backgroundColor: contact.color }}
                >
                    <EmojiDisplay emoji={contact.emoji} sizeInPx={22} />
                </div>
                <div className="flex flex-col text-left">
                    <Body isSemibold>{contact.name}</Body>
                    <Body>{truncateMiddle(contact.address)}</Body>
                </div>
            </div>
        </button>
    );
};

export default ContactListItem;
