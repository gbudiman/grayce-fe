import { all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { upstream } from 'utils/saga';

function* create(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.post(`/admins/users/${payload.userId}/care_journeys`, {
      care_situation: payload.careSituation,
      goals: payload.goals,
      stage: payload.stage,
    });
  });
}

function* fetch(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.get(
      `/admins/users/${payload.userId}/care_journeys/${payload.careJourneyId}`,
    );
  });
}

export default function* () {
  yield all([
    yield takeLatest('careJourneys/create', create),
    yield takeLatest('careJourneys/fetch', fetch),
  ]);
}
