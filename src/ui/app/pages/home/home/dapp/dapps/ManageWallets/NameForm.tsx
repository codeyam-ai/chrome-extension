import { useCallback } from 'react';

import Input from '_src/ui/app/shared/inputs/Input';
import Body from '_src/ui/app/shared/typography/Body';

import type { SyntheticEvent } from 'react';

const NameForm = ({
    name,
    nameFor,
    onChange,
}: {
    name: string;
    nameFor: string;
    onChange: (name: string) => void;
}) => {
    const handleChange = useCallback(
        (e: SyntheticEvent<HTMLInputElement>) => {
            onChange(e.currentTarget.value);
        },
        [onChange]
    );

    return (
        <div className="flex flex-col gap-6 py-6">
            <Body className="px-6">Enter a name for this {nameFor}.</Body>
            <div className="flex flex-col gap-2 px-6">
                <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default NameForm;
