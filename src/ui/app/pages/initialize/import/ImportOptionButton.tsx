import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

export interface ImportOptionButtonProps {
    title: string;
    image: string;
    isActive: boolean;
    onClick: () => void;
}

const ImportOptionButton = ({
    title,
    image,
    isActive,
    onClick,
}: ImportOptionButtonProps) => {
    return (
        <div
            className={`flex flex-col gap-5 px-6 pb-4 cursor-pointer rounded-lg bg-ethos-light-background-secondary ${
                isActive
                    ? // change margin to adapt to added border so element doesn't jump
                      '-m-[2px] ring-0 border-2 border-ethos-light-primary-light shadow-ethos-light-stroke-focused'
                    : ''
            }`}
            onClick={onClick}
        >
            <img src={image} alt={title} />
            <BodyLarge isSemibold>{title}</BodyLarge>
        </div>
    );
};

export default ImportOptionButton;
