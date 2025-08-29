import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

type TreeNodeProps = {
  label: string;
  children?: React.ReactNode;
};

export function TreeNode({ label, children }: TreeNodeProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!children;

  return (
    <div className="ml-2">
      <div
        className="flex items-center gap-1 cursor-pointer select-none hover:bg-gray-100 p-1 rounded"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? (
            <IoIosArrowDown size={16} className="text-gray-600" />
          ) : (
            <IoIosArrowForward size={16} className="text-gray-600" />
          )
        ) : (
          <span className="w-4" /> // empty space for alignment
        )}
        <span>{label}</span>
      </div>

      {open && (
        <div className="ml-4 border-l border-gray-200 pl-2">{children}</div>
      )}
    </div>
  );
}
