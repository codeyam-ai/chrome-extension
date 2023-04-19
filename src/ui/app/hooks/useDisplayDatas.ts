import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { api } from '../redux/store/thunk-extras';

export type DisplayData = {
    imageUrl: string;
    name?: string;
    description?: string;
};

const useDisplayDatas = (objectIds: string[]): Record<string, DisplayData> => {
    const queryResult = useQuery(
        [`multiget-object-${objectIds.join('-')}`, objectIds],
        async () => {
            const provider = api.instance.fullNode;

            if (!provider) {
                throw new Error('Provider has not been instantiated');
            }

            return provider.multiGetObjects({
                ids: objectIds,
                options: {
                    showContent: true,
                    showDisplay: true,
                },
            });
        },
        {
            // This is currently expected to fail for non-SUI tokens, so disable retries:
            retry: false,
            // Never consider this data to be stale:
            staleTime: Infinity,
            // Keep this data in the cache for 24 hours.
            // We allow this to be GC'd after a very long time to avoid unbounded cache growth.
            cacheTime: 24 * 60 * 60 * 1000,
        }
    );

    const displayDatas = useMemo(() => {
        if (!queryResult.data) return {};

        return queryResult.data.reduce((acc, object) => {
            const data = object.data;
            if (!data) return acc;

            if (
                data.display &&
                data.display.data &&
                typeof data.display.data === 'object' &&
                'image_url' in data.display.data
            ) {
                acc[data.objectId] = {
                    imageUrl: data.display.data.image_url,
                    name: data.display.data.name,
                    description: data.display.data.description,
                };
            } else if (
                data.content &&
                data.content.dataType === 'moveObject' &&
                data.content.fields &&
                'image_url' in data.content.fields
            ) {
                acc[data.objectId] = {
                    imageUrl: data.content.fields.image_url,
                    name: data.content.fields.name,
                    description: data.content.fields.description,
                };
            }
            return acc;
        }, {} as Record<string, DisplayData>);
    }, [queryResult]);

    return displayDatas;
};

export default useDisplayDatas;
