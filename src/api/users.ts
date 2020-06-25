import { all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { upstream } from 'utils/saga';

function* fetch(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.get('/admins/users');
  });
}

function* show(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.get(`/admins/users/${payload.userId}`);
  });
}


function* regularView(action: any) {
  const { type, payload } = action;

  yield upstream(type, function* () {
    return yield axios.get(`/users/${payload.userId}`);
  })
}

export default function* () {
  yield all([
    yield takeLatest('users/fetch', fetch),
    yield takeLatest('users/show', show),
    yield takeLatest('users/regularView', regularView),
  ]);
}
