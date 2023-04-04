import CardRow from './CardRow';
import From from './From';

const FromToCard = ({ to }: { to: string }) => {
    return (
        <div className="p-6">
            <div className="bg-[#F8F5FF] border border-ethos-light-purple rounded-xl overflow-hidden flex flex-col divide-y divider-color-ethos-light-purple">
                <From />
                {to && <CardRow title="To" value={to} />}
            </div>
        </div>
    );
};

export default FromToCard;
