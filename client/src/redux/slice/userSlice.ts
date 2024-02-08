import { createSlice } from "@reduxjs/toolkit";

// Helper function to load player data from local storage
const loadFromLocalStorage = () => {
  try {
    const stateData = localStorage.getItem("user");
    return stateData ? JSON.parse(stateData) : null;
  } catch (error) {
    return [];
  }
};

// Helper function to save state data to local storage
const saveToLocalStorage = (type: string, state: any) => {
  localStorage.setItem(type, JSON.stringify(state));
};

// Initial state for the player reducer
const initialState = loadFromLocalStorage();

// Creating the player slice using createSlice from Redux Toolkit
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { accessToken, refreshToken, ...userData } = action.payload;

      // Update the state directly
      state = { ...userData };

      // Save the updated state to local storage
      saveToLocalStorage("accessToken", accessToken);
      saveToLocalStorage("refreshToken", refreshToken);
      saveToLocalStorage("user", state);
      console.log(state);
    },
    logout: (state) => {
      state.user = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

// Exporting individual actions from the player slice
export const { setUser, logout } = userSlice.actions;

// Exporting the player reducer
export default userSlice.reducer;
