import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchItem, setSearchItem] = useState("");
  const dispatch = useDispatch();

  const filteredItem = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    console.log("Paste ID to delete:", pasteId);
    dispatch(removeFromPaste(pasteId));
  };


  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste?.title,
          text: paste?.content,
          url: window.location.href,
        })
        .then(() => {
          toast.success("Content shared successfully!");
        })
        .catch((error) => {
          toast.error("Failed to share content.");
          console.error("Sharing error:", error);
        });
    } else {
      toast.error("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black min-h-screen p-5 text-white">
      <input
        className="p-2 rounded-2xl w-full max-w-lg mx-auto block text-black placeholder-gray-500"
        type="search"
        placeholder="Search here"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredItem.length > 0 &&
          filteredItem.map((paste) => (
            <div
              className="relative border rounded-xl p-4 shadow-lg bg-opacity-20 bg-gray-900"
              key={paste.id || paste.title}
            >
              {/* Buttons in Top Right */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="bg-blue-600 px-3 py-1 rounded text-sm flex items-center justify-center">
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="bg-green-600 px-3 py-1 rounded text-sm flex items-center justify-center">
                  <a href={`/pastes/${paste?._id}`}>View</a>
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded text-sm flex items-center justify-center"
                  onClick={() => handleDelete(paste?._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-600 px-3 py-1 rounded text-sm flex items-center justify-center"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
                <button
                  className="bg-indigo-600 px-3 py-1 rounded text-sm flex items-center justify-center"
                  onClick={() => handleShare(paste)}
                >
                  Share
                </button>
              </div>
              {/* Paste Content */}
              <h3 className="text-lg font-bold mb-3">{paste.title}</h3>
              <div className="text-sm mt-3 opacity-75">
                Created At: {paste.createdAt}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
