import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const ViewPaste = () => {

    const {id}=useSearchParams();
    const allPastes=useSelector((state)=>state.paste.pastes)
    const paste=allPastes.filter((p)=>p._id===id)
    console.log("final paste",paste)
    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle,_rgba(0,0,0,_1)_0%,_rgba(33,33,33,_1)_100%)]">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 space-y-6 mt-6">
          <div className="flex items-center space-x-3 mb-8">
            <input
              type="text"
              placeholder="Enter title"
              value={paste.content}
              disabeled
              onChange={(e) => setTitle(e.target.value)}
              className="w-2/3 p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <textarea
              value={paste}
              placeholder="Enter content here"
              onChange={(e) => setValue(e.target.value)}
              rows={20}
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            />
          </div>
        </div>
      </div>
    )
}
export default ViewPaste;