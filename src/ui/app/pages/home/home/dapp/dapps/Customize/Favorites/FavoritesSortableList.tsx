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
                <DappListItem key={item.id} item={item} />
            )),
        [favoritesState]
    );

    const notFavoriteItems = useMemo(
        () =>
            notFavoritesState.map((item) => (
                <DappListItem key={item.id} item={item} />
            )),
        [notFavoritesState]
    );

    return (
        <div className="flex flex-col">
            <div
                ref={favoriteScrollContainerRef}
                className="flex overflow-x-auto flex-nowrap mb-4 pl-4"
            >
                <ReactSortable
                    group="shared"
                    list={favoritesState}
                    setList={setFavoritesState}
                    style={{ display: 'flex' }}
                >
                    {favoriteItems}
                </ReactSortable>
            </div>
            <div
                ref={notFavoriteScrollContainerRef}
                className="flex overflow-x-auto flex-nowrap pl-4"
            >
                <ReactSortable
                    group="shared"
                    list={notFavoritesState}
                    setList={setNotFavoritesState}
                    style={{ display: 'flex' }}
                >
                    {notFavoriteItems}
                </ReactSortable>
            </div>
        </div>
    );
};
