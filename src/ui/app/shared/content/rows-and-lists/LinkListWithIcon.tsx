import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import BodyLarge from '../../typography/BodyLarge';
import EthosLink, { type EthosLinkProps } from '../../typography/EthosLink';

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
                    <div className={'flex flex-row justify-between'} key={key}>
                        <BodyLarge key={key}>
                            <EthosLink
                                type={textAndLink.link.type}
                                to={textAndLink.link.to}
                            >
                                {textAndLink.text}
                            </EthosLink>
                        </BodyLarge>
                        <div className={'text-ethos-light-text-medium'}>
                            <ArrowUpRightIcon width={16} height={16} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LinkListWithIcon;
