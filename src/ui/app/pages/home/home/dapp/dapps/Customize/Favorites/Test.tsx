import React, { FC, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface ItemType {
    id: number;
    name: string;
}

export const TestSort: FC = (props) => {
    const [state1, setState1] = useState<ItemType[]>([
        { id: 1, name: 'shrek1' },
        { id: 2, name: 'fiona1' },
    ]);
    const [state2, setState2] = useState<ItemType[]>([
        { id: 3, name: 'shrek2' },
        { id: 4, name: 'fiona2' },
    ]);

    return (
        <div>
            <ReactSortable group="shared" list={state1} setList={setState1}>
                {state1.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable group="shared" list={state2} setList={setState2}>
                {state2.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
        </div>
    );
};
