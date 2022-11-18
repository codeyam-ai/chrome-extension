import Header from '../../typography/Header';

interface BasicSectionHeaderProps {
    text: string;
}

const BasicSectionHeader = ({ text }: BasicSectionHeaderProps) => {
    return (
        <div className="p-6 text-left">
            <Header>{text}</Header>
        </div>
    );
};

export default BasicSectionHeader;
