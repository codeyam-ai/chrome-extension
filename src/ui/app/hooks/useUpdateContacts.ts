import { useCallback } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { saveContacts } from '../redux/slices/contacts';

import type { Contact } from '../redux/slices/contacts';

export const useUpdateContacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(({ contacts }) => contacts.contacts);

    const _saveContacts = useCallback(
        async (updatedContacts: Contact[]) => {
            await dispatch(saveContacts(updatedContacts));
        },
        [dispatch]
    );

    const addContact = useCallback(
        // This hook doesn't immediately get the updated contacts, so when calling addContact
        // directly after another function, you must pass in the current contacts returned by
        // the previous function.
        async (newContact: Contact, currentContacts?: Contact[]) => {
            let updatedContacts: Contact[] = [];
            currentContacts
                ? (updatedContacts = [...currentContacts, newContact])
                : (updatedContacts = [...contacts, newContact]);
            await _saveContacts(updatedContacts);
            return updatedContacts;
        },
        [_saveContacts, contacts]
    );

    const removeContact = useCallback(
        async (address: string) => {
            const updatedContacts = contacts.filter(
                (contact: Contact) => contact.address !== address
            );
            await _saveContacts(updatedContacts);
            return updatedContacts;
        },
        [_saveContacts, contacts]
    );

    const editContact = useCallback(
        async (address: string, updatedInfo: Partial<Contact>) => {
            const updatedContacts = contacts.map((contact: Contact) =>
                contact.address === address
                    ? { ...contact, ...updatedInfo }
                    : contact
            );
            await _saveContacts(updatedContacts);
            return updatedContacts;
        },
        [_saveContacts, contacts]
    );

    return { addContact, removeContact, editContact };
};
