import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';

import Button from '../../buttons/Button';
import RecoveryPhraseInput from '../../inputs/RecoveryPhraseInput';
import BodyLarge from '../../typography/BodyLarge';

type PassphraseFormProps = {
    onSubmit: (mnemonicFromForm: string) => void;
    isPasswordIncorrect?: boolean;
};

const CheckMnemonicForm = ({
    onSubmit,
    isPasswordIncorrect = false,
}: PassphraseFormProps) => {
    const [words, setWords] = useState(Array(12).fill(''));
    const [errorText, setErrorText] = useState('');

    const updateWord = useCallback(
        (index: number, newWord: string) => {
            const newWords = [...words];
            newWords[index] = newWord;
            setWords(newWords);
        },
        [words]
    );

    const onWordsChange = useCallback((newWords: string[]) => {
        setWords(newWords);
    }, []);

    const onPaste = useCallback(() => {}, []);

    const _onSubmit = useCallback(() => {
        const seed = (words as string[]).join(' ').trim();
        onSubmit(seed);
    }, [onSubmit, words]);

    return (
        <div className="h-full">
            <Formik
                initialValues={{
                    mnemonic: words.join(' '),
                }}
                validationSchema={Yup.object({
                    mnemonic: Yup.string().required('Enter your seed phrase'),
                })}
                onSubmit={_onSubmit}
            >
                <Form className="h-full">
                    <BodyLarge className="text-left px-6 pb-4">
                        Enter your 12 word recovery phrase to create a new
                        password.
                    </BodyLarge>
                    <RecoveryPhraseInput
                        words={words}
                        updateWord={updateWord}
                        onPaste={onPaste}
                        onWordsChange={onWordsChange}
                        errorText={
                            isPasswordIncorrect
                                ? 'Recovery Phrase is incorrect'
                                : errorText
                        }
                    />
                    <Button
                        buttonStyle="primary"
                        type="submit"
                        disabled={words.some((word) => word === '')}
                    >
                        Reset Password
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default CheckMnemonicForm;
