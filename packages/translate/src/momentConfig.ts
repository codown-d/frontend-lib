import moment from 'moment';
import { getCurrentLanguage, SupportedLangauges } from './translations';

(() => {
  const localLang = getCurrentLanguage();
  let str = 'zh-cn';
  if (localLang === SupportedLangauges.Chinese) {
    str = 'zh-cn';
  } else {
    str = 'en';
  }
  moment.locale(str);
})();
