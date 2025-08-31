import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Drive } from "../types";

export default function Drives() {
  const navigate = useNavigate();
  const { drives } = useAuth() as { drives: Drive[] };

  function handleClick(path: string) {
    navigate("/" + path);
  }

  // Format storage nicely
  function formatSize(bytes: number): string {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) return `${Math.trunc(gb)} GB`;
    const mb = bytes / (1024 * 1024);
    return `${Math.trunc(mb)} MB`;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-center border-b border-gray-300 w-1/2 mx-auto pb-2 tracking-wide">
        All Drives
      </h2>

      {/* Drives Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {drives.map((drive, index) => {
          const used =
            Number(drive.total_space) - Number(drive.available_space);

          return (
            <div
              key={index}
              onClick={() => handleClick(drive.mount_point)}
              className="p-5 w-72 rounded-2xl shadow-md bg-white border hover:shadow-lg hover:border-blue-500 cursor-pointer transition-all"
            >
              {/* Drive Header */}
              <div className="flex flex-col gap-1 mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  {drive.name}{" "}
                  <span className="text-sm text-gray-500">
                    ({drive.disk_type})
                  </span>
                </h3>
                <p className="text-sm text-gray-500">{drive.mount_point}</p>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-3 bg-gray-200 rounded-lg overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(used / Number(drive.total_space)) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Storage Info */}
              <p className="text-sm text-gray-700">
                {formatSize(Number(drive.available_space))} free of{" "}
                {formatSize(Number(drive.total_space))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
