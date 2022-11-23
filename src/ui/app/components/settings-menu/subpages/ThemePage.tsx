import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/solid';
import SegmentedControl, {
    SegmentedControlItem,
} from '_src/ui/app/shared/inputs/SegmentedControl';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const ThemePage = () => {
    const themeOptions: SegmentedControlItem[] = [
        {
            text: 'System',
            iconWithNoClasses: <ComputerDesktopIcon />,
            isActive: true,
            onClick: () => null,
        },
        {
            text: 'Light',
            iconWithNoClasses: <SunIcon />,
            isActive: false,
            onClick: () => null,
        },
        {
            text: 'Dark',
            iconWithNoClasses: <MoonIcon />,
            isActive: false,
            onClick: () => null,
        },
    ];

    return (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Theme</Header>
                <BodyLarge isTextColorMedium>
                    Choose if you&apos;d like to have the lights on or off by
                    toggling your theme below.
                </BodyLarge>
            </ContentBlock>
            <SegmentedControl items={themeOptions} />
        </div>
    );
};

export default ThemePage;
