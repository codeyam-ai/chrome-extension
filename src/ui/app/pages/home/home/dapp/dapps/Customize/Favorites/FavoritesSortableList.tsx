import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactSortable, type SortableEvent } from 'react-sortablejs';

import DappListItem from '../../../DappListItem';
import { favoritableDappsMap } from '../../../favoritableDapps';
import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { DappData } from '_src/types/DappData';
import type { FC } from 'react';

function generateUniqueId(): number {
    return Math.floor(Math.random() * 1000) + 1;
}

interface SortableItem extends DappData {
    id: number;
    name: string;
    key: string;
}

interface FavoritesSortableListProps {
    onFavoritesChosen: (favoriteDappsKeys: string[]) => void;
}

export const FavoritesSortableList: FC<FavoritesSortableListProps> = ({
    onFavoritesChosen,
}) => {
    const { favoriteDapps } = useFavoriteDapps();

    const favoriteScrollContainerRef = useRef<HTMLDivElement>(null);
    useConvertVerticalScrollToHorizontal(favoriteScrollContainerRef);

    const allDappsContainerRef = useRef<HTMLDivElement>(null);

    // Each item needs a number ID to work with react-sortablejs
    const dappsWithIds: SortableItem[] = useMemo(() => {
        const dappEntries = Array.from(favoritableDappsMap.entries()).map(
            ([key, value]) => ({ key, value })
        );

        return dappEntries.map((entry) => ({
            ...entry.value,
            id: generateUniqueId(),
            key: entry.key,
        }));
    }, []);

    const [favoritesState, setFavoritesState] = useState<SortableItem[]>(
        dappsWithIds
            .filter((item) =>
                favoriteDapps.some((fav) => fav.name === item.name)
            )
            .map((item) => {
                const key = Array.from(favoritableDappsMap.keys()).find(
                    (k) => favoritableDappsMap.get(k)?.name === item.name
                );
                return key ? { ...item, key } : undefined;
            })
            .filter((item): item is SortableItem => item !== undefined)
    );

    const [isDragging, setIsDragging] = useState(false);
    const [draggedFromFavorites, setDraggedFromFavorites] = useState(false);

    const favoriteItems = useMemo(
        () =>
            favoritesState.map((item) => (
                <div key={item.id} className="inline-block">
                    <DappListItem item={item} />
                </div>
            )),
        [favoritesState]
    );

    const allDappsItems = useMemo(
        () =>
            dappsWithIds.map((item) => {
                const isFavorite = favoritesState.some(
                    (fav) => fav.id === item.id
                );
                return (
                    <div
                        key={item.id}
                        className={`inline-block relative ${
                            isFavorite ? 'IsFavoriteIndicator' : ''
                        }`}
                    >
                        {isFavorite && (
                            <div className="absolute -top-[8px] right-[20px] p-1 rounded-full bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                                <StarIcon className="w-4 h-4 text-ethos-light-primary-light dark:bg-ethos-dark-primary-dark" />
                            </div>
                        )}
                        <DappListItem item={item} cursorDefault={isFavorite} />
                    </div>
                );
            }),
        [dappsWithIds, favoritesState]
    );

    const handleDragStart = useCallback((evt: SortableEvent) => {
        setIsDragging(true);
        setDraggedFromFavorites(
            evt.from.className.includes('FavoriteListIndicator')
        );
    }, []);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
        setDraggedFromFavorites(false);
    }, []);

    const handleClone = useCallback((evt: SortableEvent) => {
        // Keep the dapp in the UI while dragging
        if (!evt.item.parentNode) {
            return;
        }
        evt.item.parentNode.insertBefore(evt.item, evt.item.nextSibling);
    }, []);

    useEffect(() => {
        onFavoritesChosen(favoritesState.map((item) => item.key));
    }, [favoritesState, onFavoritesChosen]);

    return (
        <div className="w-full flex flex-col">
            <BodyLarge isSemibold className="text-left pl-6">
                Your Favorites
            </BodyLarge>
            <Body isTextColorMedium className="text-left pl-6 pb-2">
                Drag to reorder or remove
            </Body>
            <div
                ref={favoriteScrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap py-2 h-[85px] w-full bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
            >
                <ReactSortable
                    group={{ name: 'shared' }}
                    list={favoritesState}
                    setList={setFavoritesState}
                    style={{ display: 'flex' }}
                    animation={200}
                    bubbleScroll
                    ghostClass="opacity-50"
                    onStart={handleDragStart}
                    onEnd={handleDragEnd}
                    className="FavoriteListIndicator"
                >
                    {favoriteItems}
                </ReactSortable>
            </div>
            {isDragging && draggedFromFavorites ? (
                <ReactSortable
                    group={{ name: 'shared', pull: false }}
                    list={[]}
                    // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-empty-function
                    setList={() => {}}
                    style={{ display: 'flex' }}
                    animation={200}
                    bubbleScroll
                    ghostClass="hidden"
                    onEnd={handleDragEnd}
                    className="RemoveFromFavoritesIndicator"
                >
                    <div
                        className="flex w-full"
                        style={{
                            // Prevents awkward jump when dragging from favorites and scrolled down
                            height: allDappsContainerRef.current?.clientHeight,
                        }}
                    >
                        <div className="flex flex-col items-center justify-center gap-2 w-full h-28 m-4 rounded-lg border-2 border-dashed border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                            <MinusCircleIcon className="w-5 h-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                            <Body isTextColorMedium>
                                Drag here to remove from favorites
                            </Body>
                        </div>
                    </div>
                </ReactSortable>
            ) : (
                <div className="flex flex-col pt-4">
                    <BodyLarge isSemibold className="text-left pl-6">
                        All Apps
                    </BodyLarge>
                    <Body isTextColorMedium className="text-left pl-6 pb-2">
                        Drag up to add to favorites
                    </Body>
                    <div
                        ref={allDappsContainerRef}
                        className={`p-2 h-auto bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default`}
                    >
                        <ReactSortable
                            sort={false}
                            bubbleScroll
                            group="shared"
                            list={dappsWithIds}
                            // eslint-disable-next-line react/jsx-no-bind, @typescript-eslint/no-empty-function
                            setList={() => {}}
                            animation={200}
                            ghostClass="opacity-50"
                            onStart={handleDragStart}
                            onEnd={handleDragEnd}
                            filter={'.IsFavoriteIndicator'} // Exclude favorite dapps from being draggable
                            onClone={handleClone}
                            className="grid grid-cols-3 gap-2"
                        >
                            {allDappsItems}
                        </ReactSortable>
                    </div>
                </div>
            )}
        </div>
    );
};
