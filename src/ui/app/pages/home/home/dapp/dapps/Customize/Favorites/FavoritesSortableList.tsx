import { useCallback, useMemo, useRef, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

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

    const notFavoriteScrollContainerRef = useRef<HTMLDivElement>(null);
    useConvertVerticalScrollToHorizontal(notFavoriteScrollContainerRef);

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
    const [notFavoritesState, setNotFavoritesState] = useState<SortableItem[]>(
        dappsWithIds.filter((item) => !item.isFavorite)
    );

    const favoriteItems = useMemo(
        () =>
            favoritesState.map((item) => (
                <div key={item.id} className="inline-block">
                    <DappListItem item={item} />
                </div>
            )),
        [favoritesState]
    );

    const notFavoriteItems = useMemo(
        () =>
            notFavoritesState.map((item) => (
                <div key={item.id} className="inline-block">
                    <DappListItem item={item} />
                </div>
            )),
        [notFavoritesState]
    );

    return (
        <div className="w-full flex flex-col">
            <div
                ref={favoriteScrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap py-2 h-[85px] bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
            >
                <ReactSortable
                    group="shared"
                    list={favoritesState}
                    setList={setFavoritesState}
                    style={{ display: 'flex' }}
                    animation={200}
                    bubbleScroll
                    ghostClass="opacity-50"
                >
                    {favoriteItems}
                </ReactSortable>
            </div>
            <div
                ref={notFavoriteScrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap py-2 h-[85px] bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
            >
                <ReactSortable
                    bubbleScroll
                    group="shared"
                    list={notFavoritesState}
                    setList={setNotFavoritesState}
                    style={{ display: 'flex' }}
                    animation={200}
                    ghostClass="opacity-50"
                >
                    {notFavoriteItems}
                </ReactSortable>
            </div>
        </div>
    );
};
