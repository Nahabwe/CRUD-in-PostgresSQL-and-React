import { useState } from "react";

const TodoForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  editMode = false,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit({ title, description });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-lg rounded-lg p-8 w-full"
    >
      <h2 className="text-center text-2xl font-bold text-gray-800">
        {editMode ? "Edit Todo" : "Create Todo"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium text-sm">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          className="border border-gray-300 rounded-md focus:outline-none p-3 focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium text-sm">
          Description
        </label>
        <textarea
          placeholder="Enter description"
          className="h-24 p-3 border focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-3 w-full rounded-md font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : editMode ? "Update Todo" : "Add Todo"}
        </button>

        {editMode && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-3 w-full rounded-md font-semibold hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
