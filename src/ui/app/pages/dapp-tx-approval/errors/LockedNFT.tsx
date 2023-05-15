// import getErrorDisplaySuiForMist from '../lib/getErrorDisplaySuiForMist';
import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

const LockedNFT = () => {
    return (
        <AlertWithErrorExpand
            title="Locked NFT"
            body={
                <div className="flex flex-col gap-3">
                    <Body>
                        An NFT you are trying to transfer is locked by a
                        marketplace.
                    </Body>
                    <Body>
                        You will need to delist it from the marketplace where it
                        is listed before you can transfer it.
                    </Body>
                </div>
            }
        />
    );
};

export default LockedNFT;
