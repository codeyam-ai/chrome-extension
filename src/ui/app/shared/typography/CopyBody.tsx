import Body, { type BodyProps } from './Body';
import BodyLarge from './BodyLarge';
import { TooltipDirection } from '../../components/Tooltip';
import CopyToClipboard, {
    type CopyToClipboardProps,
} from '../../components/copy-to-clipboard';

interface CopyBodyProps extends BodyProps, CopyToClipboardProps {
    large?: boolean;
}

const CopyBody = (props: CopyBodyProps) => {
    const defaultProps = {
        ...props,
    };
    if (!defaultProps.direction) {
        defaultProps.direction = TooltipDirection.DOWN;
    }

    return (
        <CopyToClipboard {...defaultProps}>
            {defaultProps.large ? (
                <BodyLarge {...defaultProps}></BodyLarge>
            ) : (
                <Body {...defaultProps}></Body>
            )}
        </CopyToClipboard>
    );
};

export default CopyBody;
