import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

export function passwordComplexityValidation(requiredText: string) {
    return Yup.string()
        .ensure()
        .required(requiredText)
        .test({
            name: 'password-strength',
            test: (password: string) => {
                return zxcvbn(password).score > 2;
            },
            message: ({ value }) => {
                const {
                    feedback: { warning, suggestions },
                } = zxcvbn(value);
                const warn =
                    (warning && `${warning}.`) ||
                    'Password is not strong enough.';
                return `${warn} ${suggestions.join(' ')}`;
            },
        });
}
