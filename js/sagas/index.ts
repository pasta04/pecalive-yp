import { select, call, put, take, takeEvery, race } from 'redux-saga/effects';
import * as actions from '../actions';
import fetchJsonp from 'fetch-jsonp';
import { Channel } from '../types/global';

export default function* rootSaga() {
  yield call(fetchListAndApplyState);
}

function* fetchListAndApplyState() {
  try {
    yield put(actions.changeNotify(true, 'info', 'データ取得中'));

    const result: { data: Channel[]; error?: any } = yield call(fetchData, 'http://peca.live/api/v1/channels');
    if (result.error) throw result.error;
    console.log(result.data);
    yield put(actions.updateChannelList(result.data));

    yield put(actions.closeNotify());
  } catch (error) {
    yield put(actions.changeNotify(true, 'error', 'データ取得でエラーが発生しました'));
    console.error(error);
  }
}

function fetchData(url: string): Promise<{ data: any; error?: any }> {
  return new Promise((resolve, reject) => {
    fetchJsonp(`https://script.google.com/macros/s/AKfycbxlckSZmmgEMOSbVz9GBleznb9zfXSQmrTbPd_MdGIDXJuePlw/exec?url=${url}`, {
      jsonpCallback: 'callback',
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.error) {
          resolve({ data: null, error: { message: json.error } });
        }
        resolve({ data: JSON.parse(json.htmlStr) });
      })
      .catch(error => {
        resolve({ data: null, error });
      });
  });
}
