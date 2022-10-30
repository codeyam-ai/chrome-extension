import { getObjectVersion, JsonRpcProvider } from '@mysten/sui.js';
import Browser from 'webextension-polyfill';

import { API_ENV, ENV_TO_API } from '../../ApiProvider';
import { growthbook } from '../../experimentation/feature-gating';

import type { SuiMoveObject, SuiObject } from '@mysten/sui.js';

const SUINS_RECORDS = 'suins_records';
const CACHE_DELAY = 1000 * 30;

const lookup = async (name: string) => {
    const endpoint = ENV_TO_API[API_ENV.devNet].fullNode;
    const provider = new JsonRpcProvider(endpoint);

    const nameObjectId = growthbook.getFeatureValue('suins_registry', '');

    const { [SUINS_RECORDS]: recordsInfo } = await Browser.storage.local.get(
        SUINS_RECORDS
    );

    const { version, timestamp } = recordsInfo || {};
    let { suiNSRecords } = recordsInfo || {};

    if (suiNSRecords && Date.now() - timestamp > CACHE_DELAY) {
        const ref = await provider.getObjectRef(nameObjectId);
        if (ref) {
            if (version !== getObjectVersion(ref)) {
                suiNSRecords = null;
            }
        }
    }

    if (!suiNSRecords) {
        const namesObject = await provider.getObject(nameObjectId);
        if (namesObject.status === 'Exists') {
            const suiNamesObject = namesObject.details as SuiObject;
            const moveNameObject = suiNamesObject.data as SuiMoveObject;
            const records = moveNameObject.fields.records.fields.contents;

            suiNSRecords = {};
            for (const record of records) {
                const { key, value } = record.fields;
                suiNSRecords[key] = value.fields.owner;
            }
            const { version } = suiNamesObject.reference;
            const timestamp = Date.now();
            Browser.storage.local.set({
                [SUINS_RECORDS]: {
                    version,
                    timestamp,
                    suiNSRecords,
                },
            });
        }
    }

    if (!suiNSRecords) return name;

    return suiNSRecords[name] || name;
};

export default lookup;
