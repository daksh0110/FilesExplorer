import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import BreadCrumb from "../Breadcrumb/Breadcrumb";
import NavSearch from "../NavBarSearch/NavSearch";

export default function TopBar() {
  return (
    <div className="bg-gray-50 h-16 flex px-4 shadow-sm items-center border-b border-gray-200">
      <div className="flex gap-6 text-gray-700 pl-2 items-center">
        <IoMdArrowBack
          size={30}
          className="hover:bg-gray-100 p-1 cursor-pointer rounded-lg"
        />
        <IoMdArrowForward
          size={30}
          className="hover:bg-gray-100 p-1 cursor-pointer rounded-lg"
        />
        <VscDebugRestart
          size={30}
          className="hover:bg-gray-100 p-1 cursor-pointer rounded-lg"
        />
      </div>

      <div className="ml-4 w-[55%]">
        <BreadCrumb
          path={["Home", "Documents", "Projects", "UI"]}
          onNavigate={(newPath) => console.log("Navigate to:", newPath)}
        />
      </div>
      <div className="flex-1 px-4">
        <NavSearch onSearch={(q) => console.log("Searching:", q)} />
      </div>
    </div>
  );
}
