import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { useCallback, useState } from 'react';

import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

const Details = () => {
    const [details, setDetails] = useState(false);

    const toggleDetails = useCallback(() => {
        setDetails((prev) => !prev);
    }, []);

    return (
        <div className="flex flex-col gap-6 pb-6 px-12">
            <div
                className="flex flex-row justify-between items-center cursor-pointer"
                onClick={toggleDetails}
            >
                <BodyLarge className="text-[#9040F5] underline">
                    More Details
                </BodyLarge>
                <ChevronDownIcon color="#9040F5" width={20} />
            </div>
            {details && (
                <div className="flex flex-col gap-6 py-96 divider-y divider-color-[#F0EBFE]">
                    <div>
                        <BodyLarge isSemibold className="text-[#9040F5]">
                            Asset Changes
                        </BodyLarge>
                        <div>ASSET CHANGES</div>
                    </div>
                    <div>
                        <BodyLarge isSemibold className="text-[#9040F5]">
                            Asset Changes
                        </BodyLarge>
                        <div>ASSET CHANGES</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
