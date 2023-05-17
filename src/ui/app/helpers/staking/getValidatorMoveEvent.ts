import { type SuiEvent } from '@mysten/sui.js';

export function getValidatorMoveEvent(
    validatorsEvents: SuiEvent[],
    validatorAddress: string
) {
    const event = validatorsEvents.find(
        ({ parsedJson }) => parsedJson?.validator_address === validatorAddress
    );

    return event && event.parsedJson;
}
