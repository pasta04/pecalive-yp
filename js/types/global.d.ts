declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

/** チャンネル情報 */
export type Channel = {
  album: string;
  /** ビットレート(bps) */
  bitrate: number;
  /** チャンネルID */
  channelId: string;
  /** 配信者コメント */
  comment: string;
  contactUrl: string;
  /** FLVとかWMV */
  contentType: string;
  creator: string;
  description: string;
  genre: string;
  /**
   * リスナー数
   * @description 隠してる場合は-1
   */
  listeners: number;
  name: string;
  /**
   * リレー数
   * @description 隠してる場合は-1
   */
  relays: number;
  trackTitle: string;
  trackUrl: string;
  tracker: string;
  uptime: number;
  /** YPの種類。SPとか。 */
  yellowPage: string;
};
