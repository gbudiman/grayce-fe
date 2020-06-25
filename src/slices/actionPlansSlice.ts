/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { IActionPlans, EActionPlanStatus } from 'types/actionPlans';

const initialState: IActionPlans = { byId: {} };

const actionPlansSlice = createSlice({
  name: 'actionPlans',
  initialState,
  reducers: {
    create: (state, action) => state,
    update: (state, action) => state,
    toggle: (state, action) => state,
  },
  extraReducers: builder => {
    builder.addCase('careJourneys/fetch/succeeded', (state, action: any) => {
      const { payload } = action;
      const { action_plans } = payload.data;
      action_plans.map((x: { id: number; title: string; status: string }) => {
        state.byId[x.id] = {
          title: x.title,
          status:
            x.status === 'complete'
              ? EActionPlanStatus.Complete
              : EActionPlanStatus.Incomplete,
        };
      });
    });
    builder.addCase('actionPlans/create/succeeded', (state, action: any) => {
      const { payload } = action;
      const {
        id,
        title,
        user_id,
        care_journey_id,
        status,
      } = action.payload.data;

      state.byId[id] = {
        title,
        status:
          status === 'complete'
            ? EActionPlanStatus.Complete
            : EActionPlanStatus.Incomplete,
      };
    });
    builder.addCase('users/regularView/succeeded', (state, action: any) => {
      const { payload } = action;
      const { care_journey } = action.payload.data;
      const { action_plans } = care_journey;

      action_plans.map((x: { id: number; title: string; status: string }) => {
        state.byId[x.id] = {
          title: x.title,
          status:
            x.status === 'complete'
              ? EActionPlanStatus.Complete
              : EActionPlanStatus.Incomplete,
        };
      });
    });
    builder.addCase('actionPlans/toggle/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, status } = payload.data;

      state.byId[id].status =
        status === 'complete'
          ? EActionPlanStatus.Complete
          : EActionPlanStatus.Incomplete;
    });
  },
});

export const { create, update, toggle } = actionPlansSlice.actions;

export default actionPlansSlice.reducer;
