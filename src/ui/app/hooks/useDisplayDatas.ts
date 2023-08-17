import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import ipfs from '../helpers/ipfs';
import { api } from '../redux/store/thunk-extras';

export type DisplayData = {
    imageUrl: string;
    name?: string;
    description?: string;
};

const useDisplayDatas = (objectIds: string[]): Record<string, DisplayData> => {
    const queryResult = useQuery(
        [`1multiget-object-${objectIds.join('-')}`, objectIds],
        async () => {
            const client = api.instance.client;

            if (!client) {
                throw new Error('Client has not been instantiated');
            }

            return client.multiGetObjects({
                ids: objectIds,
                options: {
                    showContent: true,
                    showDisplay: true,
                },
            });
        },
        {
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
                ('image_url' in data.display.data ||
                    'url' in data.display.data ||
                    'img_url' in data.display.data)
            ) {
                acc[data.objectId] = {
                    imageUrl: ipfs(
                        data.display.data.image_url ??
                            data.display.data.img_url ??
                            data.display.data.url
                    ),
                    name: data.display.data.name,
                    description: data.display.data.description,
                };
            } else if (
                data.content &&
                data.content.dataType === 'moveObject' &&
                data.content.fields &&
                ('image_url' in data.content.fields ||
                    'url' in data.content.fields ||
                    'img_url' in data.content.fields)
            ) {
                const imageUrl =
                    'image_url' in data.content.fields &&
                    typeof data.content.fields.image_url === 'string'
                        ? data.content.fields.image_url
                        : 'url' in data.content.fields &&
                          typeof data.content.fields.url === 'string'
                        ? data.content.fields.url
                        : 'img_url' in data.content.fields &&
                          typeof data.content.fields.img_url === 'string'
                        ? data.content.fields.img_url
                        : '';
                acc[data.objectId] = {
                    imageUrl: ipfs(imageUrl),
                    name:
                        'name' in data.content.fields &&
                        (typeof data.content.fields.name === 'string' ||
                            typeof data.content.fields.name === 'undefined')
                            ? data.content.fields.name
                            : undefined,
                    description:
                        'description' in data.content.fields &&
                        (typeof data.content.fields.description === 'string' ||
                            typeof data.content.fields.description ===
                                'undefined')
                            ? data.content.fields.description
                            : undefined,
                };
            }
            return acc;
        }, {} as Record<string, DisplayData>);
    }, [queryResult]);

    return displayDatas;
};

export default useDisplayDatas;
