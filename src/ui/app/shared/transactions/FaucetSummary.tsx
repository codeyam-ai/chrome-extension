import Body from 'src/components/typography/body/Body';

const FaucetSummary = ({ small }: { small?: boolean }) => {
    return (
        <Body className={`flex gap-2 ${small ? '!text-xs' : ''}`}>
            Sui Faucet
        </Body>
    );
};

export default FaucetSummary;
