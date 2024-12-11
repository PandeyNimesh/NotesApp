import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") 
    ? JSON.parse(localStorage.getItem("pastes")) 
    : [], // Parse only if valid, otherwise use an empty array
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);

      // Update localStorage with the updated array
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast("Page created successfully"); 
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload; // Expecting a valid `_id`
      console.log("Deleting PasteId:", pasteId);
      console.log("Current Pastes Array:", state.pastes);
    
      // Find the index of the item with the matching `_id`
      const index = state.pastes.findIndex((item) => item._id === pasteId);
    
      if (index !== -1) {
        // Remove the item from the array
        state.pastes.splice(index, 1);
    
        // Update localStorage with the updated array
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
        // Notify the user
        toast.success("Paste deleted successfully");
      } else {
        // Notify the user if the paste was not found
        toast.error("Paste not found");
      }
    },
    
    
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
