export enum ECareJourneyStage {
  Independent = 'independent',
  Interdependent = 'interdependent',
  Dependent = 'dependent',
  Crisis = 'crisis',
  Griefing = 'griefing',
}

export const RCareJourneyState: { [id: string]: ECareJourneyStage } = {
  independent: ECareJourneyStage.Independent,
  interdependent: ECareJourneyStage.Interdependent,
  dependent: ECareJourneyStage.Dependent,
  crisis: ECareJourneyStage.Crisis,
  griefing: ECareJourneyStage.Griefing,
};

export interface ICareJourney {
  careSituation: string | null;
  goals: string | null;
  stage: ECareJourneyStage;
  actionPlanIds: number[];
}

export interface ICareJourneys {
  byId: { [id: string]: ICareJourney };
}
