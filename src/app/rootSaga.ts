import { fork } from 'redux-saga/effects';
import actionPlansSaga from 'api/actionPlans';
import careJourneysSaga from 'api/careJourneys';
import usersSaga from 'api/users';

export default function* rootSaga() {
  yield fork(actionPlansSaga);
  yield fork(careJourneysSaga);
  yield fork(usersSaga);
}
