import { useLocation } from 'react-router-dom';

const ManageSeed = () => {
    const location = useLocation();
    console.log(location.search);

    return <div>Manage Seed</div>;
};

export default ManageSeed;
