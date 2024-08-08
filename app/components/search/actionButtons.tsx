type ActionButtonsProps = {
  handleOnClear: () => void;
};

const ActionButtons = ({ handleOnClear }: ActionButtonsProps) => {
  return (
    <div className="flex gap-10">
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
      >
        Search
      </button>
      <button
        type="button"
        onClick={handleOnClear}
        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default ActionButtons;
