import { FiZap } from "react-icons/fi";

export function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex space-x-2 animate-bounce">
        <FiZap className="text-xl" />
        <span className="font-medium uppercase">Loading...</span>
      </div>
    </div>
  );
}
