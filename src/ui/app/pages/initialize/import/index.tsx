import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ImportOptionButton from './ImportOptionButton';
import OnboardingCard from '../../../shared/layouts/OnboardingCard';
import keyCardSrc from '_assets/images/onboarding-options/key-card.png';
import keySrc from '_assets/images/onboarding-options/key.png';
import seedCardSrc from '_assets/images/onboarding-options/seed-card.png';
import seedSrc from '_assets/images/onboarding-options/seed.png';
import Button from '_src/ui/app/shared/buttons/Button';

import type { ImportOptionButtonProps } from './ImportOptionButton';

const ImportPage = () => {
    const [selectedOption, setSelectedOption] = useState<'seed' | 'key'>();
    const navigate = useNavigate();

    const rightCardContent = (
        <div className="flex flex-col gap-6">
            <img
                src={seedCardSrc}
                alt="Seed Phrase"
                className={selectedOption === 'key' ? 'blur-sm' : ''}
            />
            <img
                src={keyCardSrc}
                alt="Private Key"
                className={selectedOption === 'seed' ? 'blur-sm' : ''}
            />
        </div>
    );

    const selectSeed = useCallback(() => {
        setSelectedOption('seed');
    }, []);

    const selectPrivateKey = useCallback(() => {
        setSelectedOption('key');
    }, []);

    const onContinue = useCallback(() => {
        if (!selectedOption) {
            return;
        }
        if (selectedOption === 'seed') {
            navigate('/initialize/import/seed');
        } else {
            navigate('/initialize/import/key');
        }
    }, [selectedOption, navigate]);

    const importOptionButtonItems: ImportOptionButtonProps[] = [
        {
            title: 'Recovery Phrase',
            image: seedSrc,
            onClick: selectSeed,
            isActive: selectedOption === 'seed',
        },
        {
            title: 'Private Key',
            image: keySrc,
            onClick: selectPrivateKey,
            isActive: selectedOption === 'key',
        },
    ];

    return (
        <OnboardingCard
            title="Import Wallet"
            subtitle="Would you like to use a recovery phrase or private key?"
            accentColor="silver"
            icon="key"
            progressCompleted={1}
            progressTotal={4}
            customRightCard={rightCardContent}
        >
            <div className="flex flex-col gap-10 px-10 pb-10">
                {importOptionButtonItems.map((i, key) => {
                    return (
                        <ImportOptionButton
                            title={i.title}
                            image={i.image}
                            onClick={i.onClick}
                            isActive={i.isActive}
                            key={key}
                        />
                    );
                })}
            </div>
            <div className="px-10 pb-10">
                <Button
                    onClick={onContinue}
                    disabled={!selectedOption}
                    removeContainerPadding
                >
                    Continue
                </Button>
            </div>
        </OnboardingCard>
    );
};

export default ImportPage;
