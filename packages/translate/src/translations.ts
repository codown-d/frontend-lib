import { en } from './en';
import { zh } from './zh';

const dic = { en, zh };

export enum SupportedLangauges {
  // eslint-disable-next-line no-unused-vars
  Chinese = 'zh',
  // eslint-disable-next-line no-unused-vars
  English = 'en',
}

export function getCurrentLanguage(): SupportedLangauges {
  return (
    (localStorage.getItem('language') as SupportedLangauges) ||
    (navigator.languages.includes(SupportedLangauges.Chinese) ? SupportedLangauges.Chinese : SupportedLangauges.English)
  );
}

export const localLang = getCurrentLanguage();

export const translations = dic[localLang];
