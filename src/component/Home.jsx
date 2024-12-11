import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // After creation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle,_rgba(0,0,0,_1)_0%,_rgba(33,33,33,_1)_100%)]">
      <div className="w-[60%] h-[90%] bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
        {/* Title and Button in the Same Row */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={createPaste}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {pasteId ? "Update" : "Create"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          className="flex-grow p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default Home;
