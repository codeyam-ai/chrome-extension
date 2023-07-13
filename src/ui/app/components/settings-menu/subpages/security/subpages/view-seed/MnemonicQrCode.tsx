import { QRCode } from 'react-qrcode-logo';

import ethosIconWhite from '_images/ethos-icon-white.png';
import ethosIcon from '_images/ethos-icon.png';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import { useTheme } from '_src/shared/utils/themeContext';

interface MnemonicQrCodeProps {
    mnemonic: string;
}

const MnemonicQrCode: React.FC<MnemonicQrCodeProps> = ({ mnemonic }) => {
    const { resolvedTheme } = useTheme();

    return (
        <div className="flex flex-col items-center">
            <BodyLarge className="w-full text-left pb-4">
                Scan with your Ethos mobile app to automatically import your
                wallet:
            </BodyLarge>
            <QRCode
                // The QR Code scanner in React Native only supports URLs, so I made this a pseudo-deep link
                value={`ethos://${encodeURIComponent(mnemonic)}`}
                size={200}
                quietZone={0}
                eyeRadius={[
                    [10, 10, 0, 10], // top/left eye
                    [10, 10, 10, 0], // top/right eye
                    [10, 0, 10, 10], // bottom/left
                ]}
                fgColor={resolvedTheme === 'light' ? '#6D28D9' : 'white'}
                bgColor={resolvedTheme === 'light' ? 'white' : '#111111'}
                logoImage={
                    resolvedTheme === 'light' ? ethosIcon : ethosIconWhite
                }
                logoHeight={36}
                logoWidth={30}
                logoPadding={12}
                logoPaddingStyle="circle"
                removeQrCodeBehindLogo
                qrStyle="dots"
            />
        </div>
    );
};

export default MnemonicQrCode;
