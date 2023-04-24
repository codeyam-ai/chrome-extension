import { useCallback, useMemo, useRef, useState } from 'react';
import { ReactSortable, type SortableEvent } from 'react-sortablejs';

import DappListItem from '../../../DappListItem';
import { favoritableDapps } from '../../../favoritableDapps';
import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';

import type { DappData } from '_src/types/DappData';
import type { FC } from 'react';

function generateUniqueId(): number {
    return Math.floor(Math.random() * 1000) + 1;
}

interface SortableItem extends DappData {
    id: number;
    name: string;
}

export const FavoritesSortableList: FC = (props) => {
    const favoriteScrollContainerRef = useRef<HTMLDivElement>(null);
    useConvertVerticalScrollToHorizontal(favoriteScrollContainerRef);

    const allDappsContainerRef = useRef<HTMLDivElement>(null);

    const dappsWithIds = useMemo(
        () =>
            favoritableDapps.map((dapp) => ({
                ...dapp,
                id: generateUniqueId(),
            })),
        []
    );

    const [favoritesState, setFavoritesState] = useState<SortableItem[]>(
        dappsWithIds.filter((item) => item.isFavorite)
    );

    console.log('favoritesState :>> ', favoritesState);

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
            dappsWithIds.map((item) => (
                <div
                    key={item.id}
                    className={`inline-block ${
                        favoritesState.some((fav) => fav.id === item.id)
                            ? 'border-2 border-red-500'
                            : ''
                    }`}
                >
                    <DappListItem item={item} />
                </div>
            )),
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

    const handleAdd = useCallback(
        (evt: SortableEvent) => {
            if (evt.from === allDappsContainerRef.current) {
                if (!evt.oldIndex) {
                    return;
                }
                const item = dappsWithIds[evt.oldIndex];
                setFavoritesState((prevState) => [...prevState, item]);
            }
        },
        [dappsWithIds]
    );

    const handleRemoveFromFavorites = useCallback(
        (evt: SortableEvent) => {
            console.log('handleRemove');

            const removedItemId = Number(evt.item.getAttribute('data-id'));

            const removedItem = favoritesState.find(
                (item) => item.id === removedItemId
            );
            console.log('removedItem :>> ', removedItem);
            if (draggedFromFavorites && removedItem) {
                console.log('remove');
                console.log(
                    'favoritesState.filter((item) => item.id !== removedItemId) :>> ',
                    favoritesState.filter((item) => item.id !== removedItemId)
                );
                setFavoritesState((prevState) =>
                    prevState.filter((item) => item.id !== removedItemId)
                );
            }
        },
        [draggedFromFavorites, favoritesState]
    );

    return (
        <div className="w-full flex flex-col">
            <div
                ref={favoriteScrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap py-2 h-[85px] bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
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
                    onAdd={handleAdd}
                    onRemove={handleRemoveFromFavorites}
                    className="FavoriteListIndicator"
                >
                    {favoriteItems}
                </ReactSortable>
            </div>
            {isDragging && draggedFromFavorites ? (
                <ReactSortable
                    group={{ name: 'shared', pull: false }}
                    list={favoritesState}
                    setList={setFavoritesState}
                    style={{ display: 'flex' }}
                    animation={200}
                    bubbleScroll
                    ghostClass="hidden"
                    // onStart={handleDragStart}
                    onEnd={handleDragEnd}
                    // onAdd={handleRedBoxAdd}
                    className="RemoveFromFavoritesIndicator"
                >
                    <div
                        className={`flex items-center justify-center w-full h-[85px] bg-red-500 text-white ${
                            isDragging && draggedFromFavorites ? '' : 'hidden'
                        }`}
                    >
                        Drag here to remove from favorites
                    </div>
                </ReactSortable>
            ) : (
                <div
                    ref={allDappsContainerRef}
                    className={`p-2 h-auto bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default`}
                >
                    <ReactSortable
                        sort={false}
                        bubbleScroll
                        group="shared"
                        list={dappsWithIds}
                        setList={() => {}}
                        animation={200}
                        ghostClass="opacity-50"
                        onStart={handleDragStart}
                        onEnd={handleDragEnd}
                        filter={'.border-red-500'} // Exclude favorite dapps from being draggable
                        onClone={(evt: SortableEvent) => {
                            // Keep the dapp in the UI while dragging
                            if (!evt.item.parentNode) {
                                return;
                            }
                            evt.item.parentNode.insertBefore(
                                evt.item,
                                evt.item.nextSibling
                            );
                        }}
                    >
                        {allDappsItems}
                    </ReactSortable>
                </div>
            )}
        </div>
    );
};
