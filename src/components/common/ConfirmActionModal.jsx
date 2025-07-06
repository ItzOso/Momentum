import React from "react";

function ConfirmActionModal({
  title,
  subtitle,
  cancelText = "No, Cancel",
  buttonText = "Yes, Delete",
  setView,
  onButtonClick,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setView(false);
      }} // This will close the modal
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md sm:w-fit card"
      >
        <div className="mb-4">
          <p className="font-semibold text-center">{title}</p>
          {subtitle && (
            <p className="text-gray-500 text-sm text-center">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 flex-col-reverse sm:flex-row">
          <button
            onClick={() => setView(false)}
            className="btn-secondary w-full sm:w-fit"
          >
            {cancelText}
          </button>
          <button
            onClick={onButtonClick}
            className="btn-primary w-full sm:w-fit"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModal;
