import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

interface Entry {
  name: string;
  path: string;
  file_type: string;
  size: string;
  modified: string;
  extension?: string;
}

interface FileRowProps {
  entry: Entry;
  onDoubleClick: (path: string, type: string) => void;
  onContextMenu: (
    e: React.MouseEvent,
    type: string,
    path?: string,
    name?: string
  ) => void;
}

const FileRow: React.FC<FileRowProps> = ({
  entry,
  onDoubleClick,
  onContextMenu,
}) => {
  const ext = entry.extension?.toLowerCase() || "";

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer"
      onContextMenu={(e) =>
        onContextMenu(
          e,
          entry.file_type === "Directory" ? "directory" : "file",
          entry.path,
          entry.name
        )
      }
    >
      <td
        className="px-4 py-2 font-medium text-gray-800"
        onDoubleClick={() => onDoubleClick(entry.path, entry.file_type)}
      >
        <div className="flex items-center gap-2">
          {entry.file_type === "Directory" ? (
            <span className="text-yellow-500">📁</span>
          ) : (
            <div className="w-4 h-4">
              <FileIcon
                extension={ext}
                {...((defaultStyles as any)[ext] || defaultStyles.txt)}
              />
            </div>
          )}
          <span className="block truncate">{entry.name}</span>
        </div>
      </td>
      <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
        {entry.file_type}
      </td>
      <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
        {entry.size || "--"}
      </td>
      <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
        {entry.modified || "--"}
      </td>
    </tr>
  );
};

export default FileRow;
