import CardRow from './CardRow';

const MoveCall = ({ target }: { target: string }) => {
    const [packageId, moduleName, functionName] = target.split('::');
    return (
        <CardRow
            title="Function"
            value={functionName}
            subvalue={`${packageId}::${moduleName}`}
        />
    );
};

export default MoveCall;
