import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import ContactListItem from './ContactListItem';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Title from '_src/ui/app/shared/typography/Title';

const AddressHome: React.FC = () => {
    const contacts = useAppSelector(({ contacts }) => contacts.contacts);

    const navigate = useNavigate();

    const addNewContact = useCallback(() => {
        navigate('add');
    }, [navigate]);

    return (
        <div className="flex flex-col h-[414px]">
            {contacts && contacts.length > 0 ? (
                <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">
                    {contacts.map((contact, key) => {
                        return <ContactListItem key={key} contact={contact} />;
                    })}
                </div>
            ) : (
                <div className="flex flex-col h-full items-center place-content-center">
                    <UserPlusIcon className="h-20 w-20 text-ethos-dark-primary-light dark:text-ethos-dark-primary-dark" />
                    <Title className="mt-4">Create your first contact!</Title>
                </div>
            )}

            <div className="mx-6 my-2">
                <Button onClick={addNewContact} removeContainerPadding>
                    Add New
                </Button>
            </div>
        </div>
    );
};

export default AddressHome;
