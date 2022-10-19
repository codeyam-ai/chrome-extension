import Body from '../../typography/Body';
import EthosLink, { type EthosLinkProps } from '../../typography/EthosLink';
import { TextColor } from '_src/enums/Typography';

interface textAndLink {
    description: string;
    link: EthosLinkProps;
}

interface TextLinkListProps {
    textAndLinks: textAndLink[];
}

const TextLinkList = ({ textAndLinks }: TextLinkListProps) => {
    return (
        <div className="mx-6 mb-6 text-left flex flex-col gap-2">
            {textAndLinks.map((textAndLink, key) => {
                return (
                    <Body as="p" textColor={TextColor.Medium} key={key}>
                        {textAndLink.description + ' '}
                        <EthosLink
                            type={textAndLink.link.type}
                            to={textAndLink.link.to}
                        >
                            {textAndLink.link.children}
                        </EthosLink>
                    </Body>
                );
            })}
        </div>
    );
};

export default TextLinkList;
