import RadioCard, { RadioCardItem } from './RadioCard';

interface RadioCardListProps {
    items: RadioCardItem[];
}

const RadioCardList = ({ items }: RadioCardListProps) => {
    return (
        <div className="px-6 pb-6 flex flex-col gap-2">
            {items.map((item, key) => {
                return <RadioCard item={item} key={key} />;
            })}
        </div>
    );
};

export default RadioCardList;
