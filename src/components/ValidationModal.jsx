const ValidationModal = ({
  isOpen,
  title = "Validation Required",   // default title
  message = "Please complete all required fields.", // default message
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] rounded-lg p-5 shadow-lg">

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-3 text-red-600">
          {title}
        </h2>

        {/* MESSAGE */}
        <p className="text-sm text-gray-700 mb-6">
          {message}
        </p>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="w-full bg-[#253300] text-white py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default ValidationModal;
