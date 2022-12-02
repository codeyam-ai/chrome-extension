import { type ReactNode } from 'react';
import Browser from 'webextension-polyfill';

import SettingsListItem from './SettingsListItem';
import EthosLogoGrayscale from '_src/ui/app/components/EthosLogoGrayscale';

export interface SettingsListSectionItem {
    text: string;
    iconWithNoClasses: ReactNode;
    to?: string;
    isExternalLink?: boolean;
    detailText?: string;
    onClick?: () => void;
    isExpandView?: boolean;
}

interface SettingsListSection {
    items: SettingsListSectionItem[];
    color: string;
}

interface SettingsListProps {
    listSections: SettingsListSection[];
}

const SettingsList = ({ listSections }: SettingsListProps) => {
    return (
        <div className="flex flex-col pb-4">
            {listSections.map((section, key) => {
                return (
                    <div className="pt-4 px-4 pb-2" key={key}>
                        {section.items.map((item, key) => {
                            return (
                                <SettingsListItem
                                    item={item}
                                    color={section.color}
                                    key={key}
                                />
                            );
                        })}
                    </div>
                );
            })}
            <div className="pt-4 px-4 pb-2">
                <SettingsListItem
                    item={{
                        text: 'Ethos Wallet',
                        iconWithNoClasses: <EthosLogoGrayscale />,
                        detailText: 'v' + Browser.runtime.getManifest().version,
                    }}
                    color=""
                />
            </div>
        </div>
    );
};

export default SettingsList;
