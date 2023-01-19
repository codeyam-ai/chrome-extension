import truncateMiddle from '../../helpers/truncate-middle';
import CopyBody from '../../shared/typography/CopyBody';

const formatAddress = (address?: string) => {
    return truncateMiddle(address, 5);
};

const CopyAsset = ({
    address,
    module,
    name,
}: {
    address?: string;
    module?: string;
    name?: string;
}) => (
    <CopyBody
        txt={`${address}::${module}::${name}`}
        className="flex justify-end"
    >
        {formatAddress(address)}::{module}::{name}
    </CopyBody>
);

export default CopyAsset;
