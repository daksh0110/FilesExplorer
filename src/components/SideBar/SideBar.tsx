import { TreeNode } from "../FileNode/FileNode";

export default function SideBar() {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-3xl shadow">
          <TreeNode label="Web">
            <TreeNode label="Google Photos"></TreeNode>
          </TreeNode>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow">
          <TreeNode label="Home">
            <TreeNode label="Documents">
              <TreeNode label="Projects">
                <TreeNode label="UI" />
                <TreeNode label="Backend" />
              </TreeNode>
              <TreeNode label="Notes" />
            </TreeNode>
            <TreeNode label="Pictures">
              <TreeNode label="Vacation" />
              <TreeNode label="Family" />
            </TreeNode>
          </TreeNode>
        </div>
      </div>
    </aside>
  );
}
