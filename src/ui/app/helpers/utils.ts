import type {
    ExecutionStatus,
    MoveValue,
    MoveStruct,
    OwnedObjectRef,
    SuiMoveObject,
    SuiObjectData,
    SuiObjectRef,
    SuiObjectResponse,
    SuiTransactionBlockResponse,
    TransactionEffects,
} from '@mysten/sui.js/client';

type ExecutionStatusType = ExecutionStatus['status'];

const utils = {
    getTransactionEffects: (data: SuiTransactionBlockResponse) => {
        return data.effects;
    },

    getTotalGasUsed: (effects?: TransactionEffects | null): bigint => {
        const gasSummary = effects?.gasUsed;
        if (!gasSummary) return BigInt(0);
        return (
            BigInt(gasSummary.computationCost) +
            BigInt(gasSummary.storageCost) -
            BigInt(gasSummary.storageRebate)
        );
    },

    getExecutionStatusType: (
        effects?: TransactionEffects | null
    ): ExecutionStatusType | undefined => {
        return effects?.status?.status ?? undefined;
    },

    getTimestampFromTransactionResponse: (
        timestampMs?: string | null
    ): string | undefined => {
        return timestampMs ?? undefined;
    },

    getObjectFields: (
        resp: SuiObjectResponse | SuiMoveObject | SuiObjectData,
    ): {[key: string]: MoveValue} | undefined => {
        if ('fields' in resp) {
            if (resp.fields) {
                const fields = resp.fields;
                if (utils.isStringDictionary(fields)) {
                    return fields;
                } else if (utils.isMoveStruct(fields) && 'fields' in fields) {
                    if (utils.isStringDictionary(fields.fields)) {
                        return fields.fields;
                    }
                }
            }
        }
    },

    isStringDictionary(obj: unknown): obj is { [key: string]: MoveValue } {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
      
        for (const key in obj) {
            if (typeof key !== 'string') {
                return false;
            }
        }
      
        return true;
    },

    isMoveStruct(value: unknown): value is MoveStruct {
        return Array.isArray(value) || 
               (typeof value === 'object' && 
                value !== null && 
                ('fields' in value || ("type" in value && typeof value.type === 'string')));
    },

    isSuiObjectResponse(
        resp: SuiObjectResponse | SuiObjectData,
    ): resp is SuiObjectResponse {
        return (resp as SuiObjectResponse).data !== undefined;
    },

    getObjectReference(
        resp: SuiObjectResponse | OwnedObjectRef,
    ): SuiObjectRef | undefined {
        if ('reference' in resp) {
            return resp.reference;
        }
        const exists = resp.data;
        if (exists) {
            return {
                objectId: exists.objectId,
                version: exists.version,
                digest: exists.digest,
            };
        }
        return utils.getObjectDeletedResponse(resp);
    },

    getObjectDeletedResponse(resp: SuiObjectResponse): SuiObjectRef | undefined {
        if (
            resp.error &&
            'object_id' in resp.error &&
            'version' in resp.error &&
            'digest' in resp.error
        ) {

            return {
                objectId: resp.error.object_id,
                version: resp.error.version,
                digest: resp.error.digest,
            } as SuiObjectRef;
        }
    
        return undefined;
    },
    
    getObjectNotExistsResponse(resp: SuiObjectResponse): string | undefined {
        if (
            resp.error &&
            'object_id' in resp.error &&
            !('version' in resp.error) &&
            !('digest' in resp.error)
        ) {
            return resp.error.object_id as string;
        }
    
        return undefined;
    },

    getObjectId(data: SuiObjectResponse | SuiObjectRef | OwnedObjectRef): string {
        if ('objectId' in data) {
            return data.objectId;
        }
        return (
            utils.getObjectReference(data)?.objectId ?? utils.getObjectNotExistsResponse(data as SuiObjectResponse) as string
        );
    },
    
    getObjectVersion(
        data: SuiObjectResponse | SuiObjectRef | SuiObjectData,
    ): string | number | undefined {
        if ('version' in data) {
            return data.version;
        }
        return utils.getObjectReference(data)?.version;
    }
      
};

export default utils;
