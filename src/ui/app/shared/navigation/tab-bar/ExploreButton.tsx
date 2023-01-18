import exploreButtonSrc from '_assets/images/explore-button.png';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useExplorerPermission } from '_src/ui/app/hooks';

const ExploreButton = () => {
    const setExplorerPermission = useExplorerPermission();

    return (
        <div
            className="flex flex-row justify-center items-center"
            onMouseOver={setExplorerPermission}
        >
            <a
                href={DASHBOARD_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex h-[36px] w-[99px] gap-2 px-3 py-[9px] items-center border rounded-full border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke shadow-ethos-shadow-small"
            >
                <img src={exploreButtonSrc} alt="" className="h-full w-full" />
            </a>
        </div>
    );
};

export default ExploreButton;
