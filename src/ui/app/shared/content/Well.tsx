import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

interface WellProps {
    header: string;
    subHeader: string;
    forceLightMode?: boolean;
}

const Well = ({ header, subHeader, forceLightMode }: WellProps) => {
    return (
        <div className="px-6 pb-6">
            <div
                className={`flex flex-col gap-4 py-10 px-6 text-center rounded-2xl bg-ethos-light-background-secondary ${
                    forceLightMode
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary'
                }`}
            >
                <BodyLarge isSemibold>{header}</BodyLarge>
                <Body isTextColorMedium>{subHeader}</Body>
            </div>
        </div>
    );
};

export default Well;
