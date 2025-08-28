import { LS } from './config.js';
export const getJSON = (k, def=null) => { try{ return JSON.parse(localStorage.getItem(k) ?? 'null') ?? def; }catch{ return def; } };
export const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const getStr  = (k, def='') => (localStorage.getItem(k) ?? def);
export const setStr  = (k, v) => localStorage.setItem(k, String(v??''));

// 既存コードで使っていた値に合わせたラッパ
export const loadLayout = () => getJSON(LS.LAYOUT, null);
export const saveLayout = (obj) => setJSON(LS.LAYOUT, obj);
export const loadName = () => getStr(LS.ROOM_NAME, '') || '自習室';
export const saveName = (s) => setStr(LS.ROOM_NAME, s);
export const loadSeatState = () => getJSON(LS.SEAT_STATE, {});
export const saveSeatState = (st) => setJSON(LS.SEAT_STATE, st);
export const loadHistory = () => getJSON(LS.HISTORY, []);
export const saveHistory = (arr) => setJSON(LS.HISTORY, arr);
export const loadSsSettings = () => getJSON(LS.SS_SETTINGS, {});
export const saveSsSettings = (s) => setJSON(LS.SS_SETTINGS, s);
export const loadSsMedia = () => getJSON(LS.SS_MEDIA, []);
export const saveSsMedia = (a) => setJSON(LS.SS_MEDIA, a);