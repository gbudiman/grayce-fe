export enum EActionPlanStatus {
  Complete = 'complete',
  Incomplete = 'incomplete',
}

export interface IActionPlan {
  title: string;
  status: EActionPlanStatus;
}

export interface IActionPlans {
  byId: { [id: string]: IActionPlan };
}
