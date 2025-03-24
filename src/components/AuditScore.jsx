import React from "react";

const AuditScore = () => {
  return (
    <div
      className="bg-white p-14 md:p-4 rounded-lg 
                    w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 
                    mx-auto mt-2 flex flex-col mg-10"
    >
      {/* Title */}
      <h2 className="text-sm sm:text-base md:text-lg font-semibold text-left mb-3">
        Overall Audit Score
      </h2>

      {/* Progress Bar Section */}
      <div className="relative pt-2 w-[95%] mx-auto">
        {/* Score and additional text */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm sm:text-base">0</p>
          <p className="text-sm sm:text-base md:text-xl font-bold mb-1">
            72.5 / 100
          </p>
          <p className="text-sm sm:text-base">100</p>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full w-full mb-2">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: "72.5%" }}
          ></div>
        </div>

        {/* Additional text below */}
        <p className="text-md text-gray-700 my-3 text-center">
          You are <span className="font-bold">0.5</span> points behind the
          Global Average.
        </p>
      </div>
    </div>
  );
};

export default AuditScore;
