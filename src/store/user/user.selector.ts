import { createSelector } from "reselect"
import { UsersState } from "./user.reducer"
import { RootState } from '../store';

export const selectUserReducer = (state :RootState):UsersState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser);