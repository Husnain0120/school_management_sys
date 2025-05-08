import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
        <p className="text-gray-700 font-medium text-lg animate-pulse">
          Preparing your content...
        </p>
      </div>
    </div>
  );
};

export default Loading;
