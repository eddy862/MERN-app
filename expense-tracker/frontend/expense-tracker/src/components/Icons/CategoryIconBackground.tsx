import React from "react";

type Props = {
  categoryType: "expense" | "income";
  children: React.ReactNode;
};

const CategoryIconBackground = ({ categoryType, children }: Props) => {
  return (
    <div
      className={`relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full ${
        categoryType === "expense" ? "before:bg-pink-400" : "before:bg-blue-400"
      } before:bottom-1/2 before:right-1/2 before:translate-x-1/2 before:translate-y-1/2`}
    >
      {children}
    </div>
  );
};

export default CategoryIconBackground;
