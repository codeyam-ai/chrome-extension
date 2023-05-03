import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '_src/shared/utils/themeContext';
import Button from '_src/ui/app/shared/buttons/Button';
import SegmentedControl, {
    type SegmentedControlItem,
} from '_src/ui/app/shared/inputs/SegmentedControl';
import Body from '_src/ui/app/shared/typography/Body';

const ChangeWalletTheme: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    const handleOnContinue = useCallback(() => {
        navigate('/home/customize/favorites');
    }, [navigate]);

    const setThemeToSystem = useCallback(() => {
        setTheme('system');
    }, [setTheme]);

    const setThemeToLight = useCallback(() => {
        setTheme('light');
    }, [setTheme]);

    const setThemeToDark = useCallback(() => {
        setTheme('dark');
    }, [setTheme]);

    const themeOptions: SegmentedControlItem[] = [
        {
            text: 'System',
            iconWithNoClasses: <ComputerDesktopIcon />,
            isActive: theme === 'system',
            onClick: setThemeToSystem,
        },
        {
            text: 'Light',
            iconWithNoClasses: <SunIcon />,
            isActive: theme === 'light',
            onClick: setThemeToLight,
        },
        {
            text: 'Dark',
            iconWithNoClasses: <MoonIcon />,
            isActive: theme === 'dark',
            onClick: setThemeToDark,
        },
    ];

    return (
        <div className="relative flex flex-col items-center pt-6 px-6">
            <Body isSemibold className="pb-6">
                Choose if you&apos;d like to have the lights on or off by
                toggling your theme below.
            </Body>
            <SegmentedControl items={themeOptions} />
            <Button
                onClick={handleOnContinue}
                wrapperClassName="w-full"
                isInline
            >
                Next
            </Button>
        </div>
    );
};

export default ChangeWalletTheme;
