import type { SuiValidatorSummaryWithApy } from '../ValidatorList';

interface ValidatorImageProps {
    validator?: SuiValidatorSummaryWithApy;
    className: string;
}

const fallbackDefaultBgClassNames =
    'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary';

const ValidatorImage = ({ validator, className }: ValidatorImageProps) => {
    return validator?.imageUrl ? (
        <img
            src={validator.imageUrl}
            alt={validator.name}
            className={className}
        />
    ) : (
        <div className={`${className} ${fallbackDefaultBgClassNames}`} />
    );
};

export default ValidatorImage;
