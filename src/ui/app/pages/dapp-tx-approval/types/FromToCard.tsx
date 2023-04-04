import CardRow from './CardRow';
import From from './From';

const FromToCard = ({ to }: { to: string }) => {
    return (
        <div className="p-6">
            <div className="bg-ethos-pale-purple dark:bg-ethos-dark-background-secondary border border-ethos-light-purple dark:border-ethos-dark-text-stroke rounded-xl overflow-hidden flex flex-col divide-y divider-color-ethos-light-purple">
                <From />
                <CardRow title="To" value={to} />
            </div>
        </div>
    );
};

export default FromToCard;
