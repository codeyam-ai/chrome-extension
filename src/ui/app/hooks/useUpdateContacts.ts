// src/ui/app/hooks/useUpdateContacts.ts
import { useState, useEffect } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { saveContacts, setContacts } from '../redux/slices/contacts';
import { getEncrypted } from '_src/shared/storagex/store';

import type { Contact } from '../pages/home/tokens/dapp/dapps/AddressBook/AddContactForm';

export const useUpdateContacts = () => {
    const [isHostedWallet, setIsHostedWallet] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(({ contacts }) => contacts.contacts);

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted({
                key: 'authentication',
                session: true,
            });
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

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
        if (isHostedWallet) {
            // hosted wallet does not support saving contacts
            // await Authentication.updateContacts(updatedContacts);
            await dispatch(setContacts(updatedContacts));
            // await Authentication.getContacts(true);
        } else {
            await dispatch(saveContacts(updatedContacts));
        }
    };

    return { addContact, removeContact, editContact };
};
