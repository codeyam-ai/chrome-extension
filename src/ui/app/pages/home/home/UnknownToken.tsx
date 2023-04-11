import { CircleStackIcon } from '@heroicons/react/24/solid';

const UnknownToken = ({
    width = 39,
    height = 39,
}: {
    width?: number;
    height?: number;
}) => {
    return (
        <div
            className="bg-ethos-sui-blue rounded-full"
            style={{ width, height, padding: width / 6 }}
        >
            <CircleStackIcon className="text-white" />
        </div>
    );
};

export default UnknownToken;
