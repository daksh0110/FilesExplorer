import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import BreadCrumb from "../Breadcrumb/Breadcrumb";
import NavSearch from "../NavBarSearch/NavSearch";
import { AiOutlineHome } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

export default function TopBar() {
  const { "*": rawPath } = useParams();
  const path = rawPath ? rawPath.split("/home") : [""];
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const refresh = () => {
    navigate(0);
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="bg-gray-50 h-16 flex px-4 shadow-sm items-center border-b border-gray-200">
      <div className="flex gap-6 text-gray-700 pl-2 items-center">
        <IoMdArrowBack
          size={30}
          onClick={goBack}
          className="p-1 rounded-lg cursor-pointer hover:bg-gray-100"
        />
        <IoMdArrowForward
          size={30}
          onClick={goForward}
          className="p-1 rounded-lg cursor-pointer hover:bg-gray-100"
        />
        <VscDebugRestart
          size={30}
          onClick={refresh}
          className="hover:bg-gray-100 p-1 cursor-pointer rounded-lg"
        />
        <AiOutlineHome
          size={30}
          className="hover:bg-gray-100 p-1 cursor-pointer rounded-lg"
          onClick={goHome}
        />
      </div>

      <div className="ml-4 w-[55%]">
        <BreadCrumb path={path} />
      </div>

      <div className="flex-1 px-4">
        <NavSearch onSearch={(q) => console.log("Searching:", q)} />
      </div>
    </div>
  );
}
