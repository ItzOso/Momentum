import React from "react";

function ActionMenu({ actions }) {
  return (
    <div className="flex flex-col gap-1 w-48">
      {actions.map((action) => {
        const { ButtonIcon, buttonText, isDestructable, onClick } = action;
        return (
          <button
            key={action.buttonText}
            onClick={onClick}
            className={`text-sm hover:bg-gray-100 rounded-lg p-2 flex items-center gap-4 ${
              isDestructable && "text-red-600"
            }`}
          >
            <ButtonIcon /> {buttonText}
          </button>
        );
      })}
    </div>
  );
}

export default ActionMenu;
