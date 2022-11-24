import { type EthosLinkProps } from '../../typography/EthosLink';
import LinkWithIcon from './LinkWIthIcon';

interface textAndLink {
    text: string;
    link: EthosLinkProps;
}

interface LinkListWithIconProps {
    textAndLinks: textAndLink[];
}

const LinkListWithIcon = ({ textAndLinks }: LinkListWithIconProps) => {
    return (
        <div className="mb-6 text-left flex flex-col gap-4">
            {textAndLinks.map((textAndLink, key) => {
                return (
                    <LinkWithIcon
                        key={key}
                        type={textAndLink.link.type}
                        to={textAndLink.link.to}
                        text={textAndLink.text}
                    />
                );
            })}
        </div>
    );
};

export default LinkListWithIcon;
