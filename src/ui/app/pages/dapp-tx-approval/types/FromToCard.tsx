import CardRow from './CardRow';
import From from './From';

const FromToCard = ({ to }: { to: string }) => {
    return (
        <div className="p-6">
            <div className="bg-[#F8F5FF] border border-[#F0EBFE] rounded-xl overflow-hidden flex flex-col divide-y divider-color-[#F0EBFE]">
                <From />
                <CardRow title="To" value={to} />
            </div>
        </div>
    );
};

export default FromToCard;
