import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import useDisplayDatas from '_src/ui/app/hooks/useDisplayDatas';
import CopyBody from '_src/ui/app/shared/typography/CopyBody';

const AssetPreviews = ({ objectIds }: { objectIds: string[] }) => {
    const displayDatas = useDisplayDatas(objectIds);

    return (
        <div className="flex flex-col gap-1 items-end">
            {objectIds.map((objectId) => (
                <div
                    key={`asset-preview-${objectId}`}
                    className="flex items-center gap-3"
                >
                    <CopyBody txt={displayDatas[objectId]?.name ?? objectId}>
                        {truncateMiddle(
                            displayDatas[objectId]?.name ?? objectId
                        )}
                    </CopyBody>
                    {displayDatas[objectId]?.imageUrl && (
                        <img
                            src={displayDatas[objectId]?.imageUrl}
                            alt={displayDatas[objectId]?.name ?? objectId}
                            className="w-6 h-6 rounded-md"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default AssetPreviews;
