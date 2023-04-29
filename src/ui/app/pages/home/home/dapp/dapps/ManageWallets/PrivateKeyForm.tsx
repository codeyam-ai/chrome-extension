import { type SyntheticEvent, useCallback } from 'react';

import Body from '_src/ui/app/shared/typography/Body';

const PrivateKeyForm = ({
    privateKey,
    onChange,
}: {
    privateKey: string;
    onChange: (privateKey: string) => void;
}) => {
    const handleChange = useCallback(
        (e: SyntheticEvent<HTMLTextAreaElement>) => {
            onChange(e.currentTarget.value);
        },
        [onChange]
    );

    return (
        <form className="flex flex-col gap-3">
            <Body className="px-12">
                Paste your private key, in hex form, into the text area.
            </Body>
            <textarea
                value={privateKey}
                onChange={handleChange}
                placeholder="Private Key (in hex form)"
                className="w-10/12 mx-auto rounded-lg"
            />
        </form>
    );
};

export default PrivateKeyForm;
