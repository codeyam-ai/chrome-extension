import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { saveContacts } from '../redux/slices/contacts';

import type { Contact } from '../redux/slices/contacts';

export const useUpdateContacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(({ contacts }) => contacts.contacts);

    const addContact = async (newContact: Contact) => {
        const updatedContacts = [...contacts, newContact];
        await _saveContacts(updatedContacts);
    };

    const removeContact = async (address: string) => {
        const updatedContacts = contacts.filter(
            (contact: Contact) => contact.address !== address
        );
        await _saveContacts(updatedContacts);
    };

    const editContact = async (
        address: string,
        updatedInfo: Partial<Contact>
    ) => {
        const updatedContacts = contacts.map((contact: Contact) =>
            contact.address === address
                ? { ...contact, ...updatedInfo }
                : contact
        );
        await _saveContacts(updatedContacts);
    };

    const _saveContacts = async (updatedContacts: Contact[]) => {
        await dispatch(saveContacts(updatedContacts));
    };

    return { addContact, removeContact, editContact };
};
