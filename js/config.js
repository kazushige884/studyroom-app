// 先に作った「BGM管理アプリ（Netlify）」の Functions ベースURL
export const BGM_API_BASE = 'https://superlative-bienenstitch-e300de.netlify.app/.netlify/functions';

// ローカルストレージのキー類（既存と同じ名前でOK）
export const LS = {
  ROOM_PREFIX: 'room-id-prefix',
  LAYOUT: 'studyroom-layout-v7',
  ROOM_NAME: 'studyroom-name-v7',
  UNLOCK_PW: 'unlock-pw',
  HISTORY: 'usage-history-v1',
  SS_SETTINGS: 'ss.settings.v1',
  SS_MEDIA: 'ss.media.v1',
  SEAT_STATE: 'seatState',
};
export const SIZE = 10; // グリッドサイズ