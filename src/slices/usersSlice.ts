/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { IUsers } from 'types/users';

const initialState: IUsers = { byId: {} };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetch: (state, action) => state,
    show: (state, action) => state,
    regularView: (state, action) => state,
  },
  extraReducers: builder => {
    builder.addCase('users/fetch/succeeded', (state, action: any) => {
      const { payload } = action;

      payload.data.map((x: { id: number; name: string; care_journeys: [] }) => {
        state.byId[x.id] = {
          id: x.id,
          name: x.name,
          careJourneyIds: [],
          careJourneyId: null,
        };
      });
    });

    builder.addCase('users/show/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, care_journeys } = payload.data;

      state.byId[id].careJourneyIds = care_journeys.map(
        (x: { id: number }) => x.id,
      );
    });

    builder.addCase('careJourneys/create/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, user_id } = action.payload.data;

      state.byId[user_id].careJourneyIds.push(id);
    });

    builder.addCase('users/regularView/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, care_journey } = action.payload.data;

      state.byId[id].careJourneyId = care_journey.id;
      state.byId[id].careJourneyIds.push(care_journey.id);
    })
  },
});

export const { fetch, show, regularView } = usersSlice.actions;

export default usersSlice.reducer;
