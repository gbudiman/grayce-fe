/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {
  ICareJourneys,
  ECareJourneyStage,
  RCareJourneyState,
} from 'types/careJourneys';
import { stat } from 'fs';

const initialState: ICareJourneys = { byId: {} };

const careJourneysSlice = createSlice({
  name: 'careJourneys',
  initialState,
  reducers: {
    fetch: (state, action) => state,
    create: (state, action) => state,
    update: (state, action) => state,
  },
  extraReducers: builder => {
    builder.addCase('users/show/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, care_journeys } = payload.data;

      care_journeys.map(
        (x: {
          id: number;
          stage: string;
          goals: string;
          care_situation: string;
        }) => {
          state.byId[x.id] = {
            goals: x.goals,
            careSituation: x.care_situation,
            stage: RCareJourneyState[x.stage] as ECareJourneyStage,
            actionPlanIds: [],
          };
        },
      );
    });

    builder.addCase('careJourneys/create/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, care_situation, goals, stage } = action.payload.data;

      state.byId[id] = {
        goals,
        careSituation: care_situation,
        stage: RCareJourneyState[stage],
        actionPlanIds: [],
      };
    });

    builder.addCase('actionPlans/create/succeeded', (state, action: any) => {
      const { payload } = action;
      const { id, care_journey_id } = action.payload.data;

      state.byId[care_journey_id].actionPlanIds.push(id);
    });

    builder.addCase('careJourneys/fetch/succeeded', (state, action: any) => {
      const { payload } = action;
      const { action_plans, id } = payload.data;

      state.byId[id].actionPlanIds = action_plans.map(
        (x: { id: number }) => x.id,
      );
    });

    builder.addCase('users/regularView/succeeded', (state, action: any) => {
      const { payload } = action;
      const { care_journey } = action.payload.data;
      const { action_plans, id } = care_journey;

      state.byId[id] = {
        actionPlanIds: action_plans.map((x: { id: number }) => x.id),
        goals: care_journey.goals,
        stage: RCareJourneyState[care_journey.stage] as ECareJourneyStage,
        careSituation: care_journey.care_situation,
      }
    })
  },
});

export const { fetch, create, update } = careJourneysSlice.actions;

export default careJourneysSlice.reducer;
