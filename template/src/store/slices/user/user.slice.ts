import { createSlice } from '@reduxjs/toolkit';
import { SetUsernamePayloadAction, UserState } from './user.types';

export const initialState: UserState = { isLoggedIn: true, };

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUsername: (state, action: SetUsernamePayloadAction) => {
      state.username = action.payload;
    }
  }
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
