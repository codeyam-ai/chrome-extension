// import getErrorDisplaySuiForMist from '../lib/getErrorDisplaySuiForMist';
import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

type NotEnoughGasProps = {
    gasRequired: string;
    gasAvailable: string;
};

const NotEnoughGas = ({ gasRequired, gasAvailable }: NotEnoughGasProps) => {
    return (
        <AlertWithErrorExpand
            title="You don't have enough SUI"
            body={
                <div className="flex flex-col gap-3">
                    <Body>
                        It looks like your wallet doesn&apos;t have enough SUI
                        to pay for this transaction.
                    </Body>
                    <Body>Required: {gasRequired} SUI</Body>
                    <Body>Available: {gasAvailable} SUI</Body>
                </div>
            }
        />
    );
};

export default NotEnoughGas;
