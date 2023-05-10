import { Outlet } from 'react-router-dom';

export const SettingsContainer = () => (
    <div className="absolute flex flex-col h-[550px] w-full overflow-y-auto z-20 drop-shadow-ethos-box-shadow sm:rounded-[20px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
        <div className="overflow-scroll no-scrollbar">
            <Outlet />
        </div>
    </div>
);
