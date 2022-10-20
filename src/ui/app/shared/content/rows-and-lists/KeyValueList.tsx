import Body from '../../typography/Body';
import { TextColor } from '_src/enums/Typography';

type KeyNameAndValue = {
    keyName: string;
    value: string;
};

interface KeyValueListProps {
    keyNamesAndValues: KeyNameAndValue[];
}

const KeyValueList = ({ keyNamesAndValues }: KeyValueListProps) => {
    return (
        <div className="px-6 pb-6">
            {keyNamesAndValues.map((item, key) => {
                return (
                    <div className="flex flex-row justify-between" key={key}>
                        <Body textColor={TextColor.Medium}>{item.keyName}</Body>
                        <Body>{item.value}</Body>
                    </div>
                );
            })}
        </div>
    );
};

export default KeyValueList;
