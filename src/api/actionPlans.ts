import { all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { upstream } from 'utils/saga';

function* create(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.post(
      `admins/users/${payload.userId}/care_journeys/${payload.careJourneyId}/action_plans`,
      { title: payload.title },
    );
  });
}

function* toggle(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.post(
      `action_plans/${payload.actionPlanId}/${payload.status}`,
      {},
    );
  });
}

export default function* () {
  yield all([
    yield takeLatest('actionPlans/create', create),
    yield takeLatest('actionPlans/toggle', toggle),
  ]);
}
