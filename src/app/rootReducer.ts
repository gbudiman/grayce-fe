import { combineReducers } from '@reduxjs/toolkit';
import users from 'slices/usersSlice';
import careJourneys from 'slices/careJourneysSlice';
import actionPlans from 'slices/actionPlansSlice';

const rootReducer = combineReducers({
  users,
  careJourneys,
  actionPlans,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
