import React from "react";

type Props = {
  categoryType: "expense" | "income";
  children: React.ReactNode;
  size?: number;
};

const CategoryIconBackground = ({ categoryType, children, size }: Props) => {
  const sizing = size
    ? `before:w-${size} before:h-${size}`
    : "before:w-4 before:h-4";

  return (
    <div
      className={`relative before:content-[''] before:absolute ${sizing} before:rounded-full ${
        categoryType === "expense" ? "before:bg-pink-400" : "before:bg-blue-400"
      } before:bottom-1/2 before:right-1/2 before:translate-x-1/2 before:translate-y-1/2`}
    >
      {children}
    </div>
  );
};

export default CategoryIconBackground;
