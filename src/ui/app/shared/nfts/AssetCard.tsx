export const AssetCard = ({
    imgUrl,
    name,
    icon,
}: {
    imgUrl: string;
    name: string;
    icon?: any;
}) => (
    <div className={'w-full'}>
        <div className={'flex flex-row justify-center mb-4'}>
            <img
                className={'rounded-2xl w-[58px] h-[58px] auto'}
                src={imgUrl}
                alt={name}
            />
            {icon && icon}
        </div>
    </div>
);
