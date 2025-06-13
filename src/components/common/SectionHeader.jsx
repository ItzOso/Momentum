import React from "react";

function SectionHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  ButtonIcon,
  align = "between", // Default alignment
  className = "", // Allow for custom classes
}) {
  // This object maps the 'align' prop to the correct Tailwind CSS classes
  // for different layout variations.
  const alignmentClasses = {
    between: "flex-col gap-4 sm:flex-row sm:justify-between sm:items-center",
    center: "flex-col text-center items-center gap-2",
    start: "flex-col items-start gap-4",
  };

  return (
    <div className={`flex ${alignmentClasses[align]} ${className}`}>
      {/* Text Content */}
      <div className={align === "center" ? "max-w-2xl" : ""}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        {/* Conditionally render the subtitle only if it's provided */}
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>

      {/* Button (conditionally renders only if buttonText and onButtonClick are provided) */}
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="btn-primary btn-icon w-full sm:w-fit"
        >
          {/* Conditionally render the icon if it's passed as a prop */}
          {ButtonIcon && <ButtonIcon className="mr-2" />}
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
