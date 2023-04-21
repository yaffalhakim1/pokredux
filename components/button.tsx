import React from "react";

interface ColorVariants {
  [key: string]: string;
}

export function Button({ color, text }: { color: any; text: any }) {
  const colorVariant: ColorVariants = {
    red: "bg-red-500 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-900",
    blue: "bg-blue-500 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-900",
    green:
      "bg-green-500 hover:bg-green-700 focus:ring-green-300 dark:focus:ring-green-900",
    yellow:
      "bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-300 dark:focus:ring-yellow-900",
  };
  return (
    <button
      type="button"
      className={`${colorVariant[color]} focus:outline-none text-white    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
    >
      {text}
    </button>
  );
}
