import { Pin } from "lucide-react";
import { ReactNode } from "react";

interface PolaroidCardProps {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function PolaroidCard({
  children,
  className = "",
  size = "medium",
}: PolaroidCardProps) {
  const sizeClasses = {
    small: "max-w-[180px]",
    medium: "max-w-md",
    large: "max-w-xl",
  };

  const rotation = size === "large" ? -2 : Math.random() * 6 - 3;

  return (
    <div
      className={`relative bg-white border-4 border-gray-900 shadow-2xl rounded-sm p-4 md:p-6 group transition-all duration-500 hover:shadow-3xl ${sizeClasses[size]} ${className}`}
      // style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Thumbtack */}
      <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
        <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
      </div>
      {children}
    </div>
  );
}
