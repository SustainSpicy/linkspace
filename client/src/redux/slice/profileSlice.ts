import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LinkProps, ProfileProps } from "../../constant/types";
import { profileData } from "../../constant/dummyData";
import { RootState } from "../store";
import { PrivateApi } from "../../api";
import { v4 as uuidv4 } from "uuid";
// Initial state for the player reducer

let initialState: {
  profile: ProfileProps | null;
  links: LinkProps | null;
  loading: boolean;
  error: null | string;
} = {
  profile: null,
  links: null,
  loading: true,
  error: null,
};

// Creating the player slice using createSlice from Redux Toolkit
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, actions) {
      if (state.profile === null) return state;
      console.log(state.profile.email);
      //   return actions.payload;
    },
    setIsOnboarding(state, actions) {
      if (state.profile === null) return state;

      //   const { profile } = state?.profile;
      const { todo } = state?.profile?.isOnboarding;

      if (actions.payload) {
        return {
          ...state,
          profile: {
            ...state.profile,
            isOnboarding: {
              valid: todo.length > 1,
              todo: todo.filter((item: string) => item !== actions.payload),
            },
          },
        };
      }

      return state;
    },
    createLink(state, actions) {
      if (state.profile === null) return state;
      const uid = uuidv4();
      const type = actions.payload;
      console.log(type);

      if (type) {
        const newLink = {
          _id: uid,
          title: "",
          url: "",
          img: "",
          type,
          display: true,
        };

        return {
          ...state,
          profile: {
            ...state.profile,
            links: [...state.profile.links, newLink],
          },
        };
      }
      return state;
    },
    deleteLink(state, actions) {
      if (state.profile === null) return state;

      const _id = actions.payload;
      console.log(_id);

      if (_id) {
        const updatedLinks = state.profile.links.filter(
          (link) => link._id !== _id
        );

        return {
          ...state,
          profile: {
            ...state.profile,
            links: updatedLinks,
          },
        };
      }
      return state;
    },
    updateLinks(state, actions) {
      if (state.profile === null) return state;

      const { _id, ...updatedLink } = actions.payload;

      if (actions.payload) {
        const updatedLinks = state.profile.links.map((link) => {
          if (link._id === _id) {
            return { ...link, ...updatedLink };
          }
          return link;
        });
        console.log(updatedLinks);

        return {
          ...state,
          profile: {
            ...state.profile,
            links: updatedLinks,
          },
        };
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch profile";
      state.profile = null;
    });
  },
});

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (email: string) => {
    const response = await PrivateApi.get("/profile/" + email);

    return profileData[0];
  }
);
// Exporting individual actions from the player slice
export const {
  createLink,
  deleteLink,
  updateLinks,
  setProfileData,
  setIsOnboarding,
} = profileSlice.actions;

// Exporting the player reducer
export default profileSlice.reducer;
