import { GlobeAltIcon } from '@heroicons/react/24/solid';

import Body from '../typography/Body';

const ExploreButton = () => {
    return (
        <div
            className="flex gap-2 items-center border rounded-full border-slate-200 px-3 py-1"
            style={{
                background:
                    'conic-gradient(from 142.18deg at 120.31% 87.5%, #EED32C -154.48deg, #E57948 118.75deg, #4AC2A7 142.91deg, #65B1DF 159.02deg, #BCA1E8 177.46deg, #EED32C 205.52deg, #E57948 478.75deg)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
            }}
        >
            <GlobeAltIcon className="h-6 w-6 text-opacity-0" />
            <Body className="text-transparent">Explore</Body>
        </div>
    );
};

export default ExploreButton;
