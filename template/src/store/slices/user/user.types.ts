import { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  readonly isLoggedIn: boolean;
  readonly username?: string;
}

export type SetUsernamePayloadAction = PayloadAction<string>;
