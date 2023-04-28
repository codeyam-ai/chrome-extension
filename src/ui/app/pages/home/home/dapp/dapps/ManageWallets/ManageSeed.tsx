import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '_src/ui/app/components/loading';
import { useAppDispatch } from '_src/ui/app/hooks';
import Header from '_src/ui/app/shared/typography/Header';
import { getImportedMnemonic } from '_src/ui/app/redux/slices/account';

const ManageSeed = () => {
    const [mnenonic, setMnemonic] = useState<string | undefined>();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');

    useEffect(() => {
        if (!name) return;
        const getMnenonic = async () => {
            const mnemonic = await dispatch(
                getImportedMnemonic({ name })
            ).unwrap();
            if (mnemonic) {
                setMnemonic(mnemonic);
            }
        };

        getMnenonic();
    }, [dispatch, name]);

    return (
        <div className="py-6 gap-6 flex flex-col">
            <Header>&#34;{name}&#34; Seed Phrase</Header>
            <Loading
                loading={!mnenonic}
                big
                className="flex justify-center py-6"
            >
                {mnenonic}
            </Loading>
        </div>
    );
};

export default ManageSeed;
