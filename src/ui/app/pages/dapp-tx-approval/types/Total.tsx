import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';

import Body from '_src/ui/app/shared/typography/Body';

const Total = () => {
    return (
        <CardRow color="#F0EBFE">
            <Body>Total</Body>
            <div className="text-right">TOTAL</div>
        </CardRow>
    );
};

export default Total;
