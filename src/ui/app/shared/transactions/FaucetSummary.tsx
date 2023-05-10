import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

const FaucetSummary = ({ timeDisplay }: { timeDisplay: string }) => {
    return (
        <div className="w-full flex justify-between items-center">
            <BodyLarge isSemibold>Sui Faucet</BodyLarge>
            <Body isTextColorMedium className="text-right">
                {timeDisplay}
            </Body>
        </div>
    );
};

export default FaucetSummary;
