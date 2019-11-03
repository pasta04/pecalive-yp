import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions';
import { Channel } from '../types/global';
type Action = ActionType<typeof actions>;

export type DialogState = {
  /** ダイアログ表示 */
  show: boolean;
  /** 確認ダイアログか否か */
  confirm: boolean;
  /** ダイアログ種別 */
  type: 'info' | 'warning' | 'error';
  /** 簡潔に表すメッセージ */
  message: string;
  /** テキストボックスとかで表示したい詳細 */
  detail: string;
};

export type GlobalState = {
  /** 通知欄 */
  notify: {
    show: boolean;
    type: 'info' | 'warning' | 'error';
    message: string;
  };
  /** ダイアログ */
  dialog: DialogState;
  /** 一覧 */
  list: Channel[];
};

export type RootState = {
  reducer: GlobalState;
};

const initial: GlobalState = {
  // 通知欄
  notify: {
    show: false,
    type: 'info',
    message: '',
  },
  dialog: {
    show: false,
    confirm: false,
    type: 'info',
    message: '',
    detail: '',
  },
  list: [],
};

const reducer = (state: GlobalState = initial, action: Action): GlobalState => {
  switch (action.type) {
    // 通知
    case getType(actions.changeNotify): {
      return { ...state, notify: { ...action.payload } };
    }
    case getType(actions.closeNotify): {
      return { ...state, notify: { ...initial.notify } };
    }
    // ダイアログ
    case getType(actions.changeDialog): {
      return { ...state, dialog: { ...state.dialog, ...action.payload } };
    }
    case getType(actions.closeDialog): {
      return { ...state, notify: { ...initial.notify } };
    }
    // チャンネルリストを取得
    case getType(actions.updateChannelList): {
      return {
        ...state,
        list: action.payload.list,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({ reducer });
