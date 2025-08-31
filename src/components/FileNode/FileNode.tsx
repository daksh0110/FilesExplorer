import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

type TreeNodeProps = {
  label: string;
  path?: string;
  onSelect?: (path: string) => void;
  children?: React.ReactNode;
};

export function TreeNode({ label, path, onSelect, children }: TreeNodeProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!children;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
    if (path && onSelect) {
      onSelect(path);
    }
  };

  return (
    <div className="ml-2">
      <div
        className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
        onClick={handleClick}
      >
        {hasChildren ? (
          open ? (
            <IoIosArrowDown size={16} className="text-gray-600" />
          ) : (
            <IoIosArrowForward size={16} className="text-gray-600" />
          )
        ) : (
          <span className="w-4" />
        )}
        <span>{label}</span>
      </div>

      {open && children && (
        <div className="ml-4 border-l border-gray-200 pl-2">{children}</div>
      )}
    </div>
  );
}
