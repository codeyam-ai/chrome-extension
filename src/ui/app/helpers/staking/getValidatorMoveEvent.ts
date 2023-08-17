import { type SuiEvent } from '@mysten/sui.js/client';

export function getValidatorMoveEvent(
    validatorsEvents: SuiEvent[],
    validatorAddress: string
) {
    const event = validatorsEvents.find(({ parsedJson }) => {
        if (
            parsedJson &&
            typeof parsedJson === 'object' &&
            'validator_address' in parsedJson
        ) {
            return parsedJson.validator_address === validatorAddress;
        } else return false;
    });

    return event && event.parsedJson;
}
