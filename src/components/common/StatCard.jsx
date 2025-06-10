import React from "react";
import { TbFaceIdError } from "react-icons/tb";

// Define your color mappings
const colorStylesMap = {
  blue: {
    containerBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    containerBorder: "border-blue-200",
    titleText: "text-blue-500",
    statText: "text-blue-900",
    iconContainerBg: "bg-blue-500",
  },
  red: {
    containerBg: "bg-gradient-to-br from-red-50 to-red-100",
    containerBorder: "border-red-200",
    titleText: "text-red-500",
    statText: "text-red-900",
    iconContainerBg: "bg-red-500",
  },
  green: {
    containerBg: "bg-gradient-to-br fromemeraldn-50 to-emerald-100",
    containerBorder: "border-emerald-200",
    titleText: "text-emerald-500",
    statText: "text-emerald-900",
    iconContainerBg: "bg-emerald-500",
  },
  orange: {
    containerBg: "bg-gradient-to-br from-orange-50 to-orange-100",
    containerBorder: "border-orange-200",
    titleText: "text-orange-500",
    statText: "text-orange-900",
    iconContainerBg: "bg-orange-500",
  },
  purple: {
    containerBg: "bg-gradient-to-br from-purple-50 to-purple-100",
    containerBorder: "border-purple-200",
    titleText: "text-purple-500",
    statText: "text-purple-900",
    iconContainerBg: "bg-purple-500",
  },
  // Add more colors as needed
  default: {
    containerBg: "bg-gradient-to-br from-gray-50 to-gray-100",
    containerBorder: "border-gray-200",
    titleText: "text-gray-500",
    statText: "text-gray-900",
    iconContainerBg: "bg-gray-500",
  },
};

function StatCard({
  title = "Stat Title",
  stat = "0",
  color = "",
  Icon = TbFaceIdError,
}) {
  // Get the specific style object for the current color, or fallback to default
  const styles = colorStylesMap[color] || colorStylesMap.default;

  return (
    <div
      className={`border rounded-lg p-6 flex justify-between shadow-xs hover:shadow-md transition-all items-center ${styles.containerBorder} ${styles.containerBg}`}
    >
      <div>
        <p className={`${styles.titleText} font-medium text-sm`}>{title}</p>
        <p className={`${styles.statText} text-3xl font-bold`}>{stat}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex justify-center items-center text-2xl text-white ${styles.iconContainerBg}`}
      >
        <Icon />
      </div>
    </div>
  );
}

export default StatCard;
