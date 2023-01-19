import { TooltipDirection } from '../../components/Tooltip';
import CopyToClipboard, {
    type CopyToClipboardProps,
} from '../../components/copy-to-clipboard';
import Body, { type BodyProps } from './Body';

interface CopyBodyProps extends BodyProps, CopyToClipboardProps {}

const CopyBody = (props: CopyBodyProps) => {
    const defaultProps = {
        ...props,
    };
    if (!defaultProps.direction) {
        defaultProps.direction = TooltipDirection.DOWN;
    }

    return (
        <CopyToClipboard {...defaultProps}>
            <Body {...defaultProps}></Body>
        </CopyToClipboard>
    );
};

export default CopyBody;
