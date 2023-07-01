/* eslint-disable no-console */
import { JsonRpcProvider } from '@mysten/sui.js';

/**
 * A JsonRpcProvider that logs all method calls.
 */
export class LoggingJsonRpcProvider extends JsonRpcProvider {
    private logMethodCall(method: string, args: unknown[]): void {
        console.log(
            `Calling method: ${method} w/ arguments: ${JSON.stringify(args)}`
        );
    }

    private logMethodResult(method: string, result: unknown): void {
        console.log(`Method call successful: ${method}`);
    }

    private logMethodError(method: string, error: Error): void {
        console.error(`Method call failed: ${method}`);
        console.error(`Error: ${error.message}`);
    }

    private wrapMethod(
        method: string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        originalMethod: Function
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): (...args: unknown[]) => Promise<any> {
        return async (...args: unknown[]): Promise<unknown> => {
            this.logMethodCall(method, args);
            try {
                const result = await originalMethod.apply(this, args);
                this.logMethodResult(method, result);
                return result;
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.logMethodError(method, error);
                throw error;
            }
        };
    }

    getRpcApiVersion = this.wrapMethod(
        'getRpcApiVersion',
        super.getRpcApiVersion
    );
    requestSuiFromFaucet = this.wrapMethod(
        'requestSuiFromFaucet',
        super.requestSuiFromFaucet
    );
    getCoins = this.wrapMethod('getCoins', super.getCoins);
    getAllCoins = this.wrapMethod('getAllCoins', super.getAllCoins);
    getBalance = this.wrapMethod('getBalance', super.getBalance);
    getAllBalances = this.wrapMethod('getAllBalances', super.getAllBalances);
    getCoinMetadata = this.wrapMethod('getCoinMetadata', super.getCoinMetadata);
    getTotalSupply = this.wrapMethod('getTotalSupply', super.getTotalSupply);
    call = this.wrapMethod('call', super.call);
    getMoveFunctionArgTypes = this.wrapMethod(
        'getMoveFunctionArgTypes',
        super.getMoveFunctionArgTypes
    );
    getNormalizedMoveModulesByPackage = this.wrapMethod(
        'getNormalizedMoveModulesByPackage',
        super.getNormalizedMoveModulesByPackage
    );
    getNormalizedMoveModule = this.wrapMethod(
        'getNormalizedMoveModule',
        super.getNormalizedMoveModule
    );
    getNormalizedMoveFunction = this.wrapMethod(
        'getNormalizedMoveFunction',
        super.getNormalizedMoveFunction
    );
    getNormalizedMoveStruct = this.wrapMethod(
        'getNormalizedMoveStruct',
        super.getNormalizedMoveStruct
    );
    getOwnedObjects = this.wrapMethod('getOwnedObjects', super.getOwnedObjects);
    getObject = this.wrapMethod('getObject', super.getObject);
    multiGetObjects = this.wrapMethod('multiGetObjects', super.multiGetObjects);
    queryTransactionBlocks = this.wrapMethod(
        'queryTransactionBlocks',
        super.queryTransactionBlocks
    );
    getTransactionBlock = this.wrapMethod(
        'getTransactionBlock',
        super.getTransactionBlock
    );
    multiGetTransactionBlocks = this.wrapMethod(
        'multiGetTransactionBlocks',
        super.multiGetTransactionBlocks
    );
    executeTransactionBlock = this.wrapMethod(
        'executeTransactionBlock',
        super.executeTransactionBlock
    );
    getTotalTransactionBlocks = this.wrapMethod(
        'getTotalTransactionBlocks',
        super.getTotalTransactionBlocks
    );
    getReferenceGasPrice = this.wrapMethod(
        'getReferenceGasPrice',
        super.getReferenceGasPrice
    );
    getStakes = this.wrapMethod('getStakes', super.getStakes);
    getStakesByIds = this.wrapMethod('getStakesByIds', super.getStakesByIds);
    getLatestSuiSystemState = this.wrapMethod(
        'getLatestSuiSystemState',
        super.getLatestSuiSystemState
    );
    queryEvents = this.wrapMethod('queryEvents', super.queryEvents);
    subscribeEvent = this.wrapMethod('subscribeEvent', super.subscribeEvent);
    // unsubscribeEvent = this.wrapMethod(
    //     'unsubscribeEvent',
    //     super.unsubscribeEvent
    // );
    devInspectTransactionBlock = this.wrapMethod(
        'devInspectTransactionBlock',
        super.devInspectTransactionBlock
    );
    dryRunTransactionBlock = this.wrapMethod(
        'dryRunTransactionBlock',
        super.dryRunTransactionBlock
    );
    getDynamicFields = this.wrapMethod(
        'getDynamicFields',
        super.getDynamicFields
    );
    getDynamicFieldObject = this.wrapMethod(
        'getDynamicFieldObject',
        super.getDynamicFieldObject
    );
    getLatestCheckpointSequenceNumber = this.wrapMethod(
        'getLatestCheckpointSequenceNumber',
        super.getLatestCheckpointSequenceNumber
    );
    getCheckpoint = this.wrapMethod('getCheckpoint', super.getCheckpoint);
    getCheckpoints = this.wrapMethod('getCheckpoints', super.getCheckpoints);
    getCommitteeInfo = this.wrapMethod(
        'getCommitteeInfo',
        super.getCommitteeInfo
    );
    getNetworkMetrics = this.wrapMethod(
        'getNetworkMetrics',
        super.getNetworkMetrics
    );
    getEpochs = this.wrapMethod('getEpochs', super.getEpochs);
    getMoveCallMetrics = this.wrapMethod(
        'getMoveCallMetrics',
        super.getMoveCallMetrics
    );
    getCurrentEpoch = this.wrapMethod('getCurrentEpoch', super.getCurrentEpoch);
    getValidatorsApy = this.wrapMethod(
        'getValidatorsApy',
        super.getValidatorsApy
    );
    waitForTransactionBlock = this.wrapMethod(
        'waitForTransactionBlock',
        super.waitForTransactionBlock
    );
}
