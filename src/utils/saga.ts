import { put, select } from 'redux-saga/effects';

const extractMessageFromError = (err: any) => {
  if (!err.response) return err.message;
  return err.response.data?.message || err.response.statusText;
};

export function* upstream(
  action: string,
  generator: any,
  originalPayload?: any,
) {
  try {
    const res = yield generator();
    yield put({
      type: `${action}/succeeded`,
      payload: {
        data: res.data,
        originalPayload,
      },
    });
  } catch (err) {
    const errorMessage = extractMessageFromError(err);
    yield put({
      type: `${action}/failed`,
      payload: {
        message: errorMessage,
        originalPayload,
      },
    });
  }
}
