import { deprecated } from 'typesafe-actions';
const { createAction } = deprecated;
import { Channel } from '../types/global';
import { DialogState } from '../reducers';

const OPEN_NOTIFY = 'OPEN_NOTIFY';
const CLOSE_NOTIFY = 'CLOSE_NOTIFY';
const OPEN_DIALOG = 'OPEN_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';

const UPDATE_CHANNEL_LIST = 'UPDATE_CHANNEL_LIST';

const DIALOG_YES = 'DIALOG_YES';
const DIALOG_NO = 'DIALOG_NO';

/** 通知欄表示 */
export const changeNotify = createAction(OPEN_NOTIFY, action => {
  return (show: boolean, type: 'info' | 'warning' | 'error', message: string) => action({ show, type, message });
});
/** 通知欄閉じる */
export const closeNotify = createAction(CLOSE_NOTIFY);

/** ダイアログ表示 */
export const changeDialog = createAction(OPEN_DIALOG, action => {
  return (args: Partial<DialogState>) => action(args);
});
/** ダイアログ閉じる */
export const closeDialog = createAction(CLOSE_DIALOG);

export const dialogYes = createAction(DIALOG_YES, action => {
  return (args: any) => action(args);
});
export const dialogNo = createAction(DIALOG_NO, action => {
  return (args: any) => action(args);
});

/** チャンネル取得結果更新 */
export const updateChannelList = createAction(UPDATE_CHANNEL_LIST, action => {
  return (list: Channel[]) => action({ list });
});
