import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user";

interface UserState {
  userInfo: IUser | null;
  isAuthenticated?: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => { // Thay đổi ở đây
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
