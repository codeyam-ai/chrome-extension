import ChangeEmojiAndColor from './ChangeEmojiAndColor';
import Title from '_src/ui/app/shared/typography/Title';

const ChangeProfilePicture: React.FC = () => {
    return (
        <div className="flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">
                Choose your wallet&apos;s profile picture
            </Title>
            <ChangeEmojiAndColor />
        </div>
    );
};

export default ChangeProfilePicture;
