import { useCallback, useState } from "react";

export interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  tooltipText: string;
}

const Tooltip = ({ children, tooltipText }: TooltipProps) => {
  const [hasMouseEntered, setHasMouseEntered] = useState(false);
  const handleMouseEnter = useCallback(() => {
    setHasMouseEntered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHasMouseEntered(false);
  }, []);
  return (
    <div className="relative flex items-center">
      <div
        className="text-xs left-full absolute whitespace-no-wrap bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded flex items-center transition-all duration-75 cursor-default z-10"
        style={
          hasMouseEntered
            ? { marginLeft: "15px", opacity: 1 }
            : { marginLeft: "10px", opacity: 0 }
        }
      >
        <div
          className="bg-gray-800 dark:bg-gray-700 h-3 w-3 absolute"
          style={{ left: "-6px", transform: "rotate(45deg)" }}
        />
        {tooltipText}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
