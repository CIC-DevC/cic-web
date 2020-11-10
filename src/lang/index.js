import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi'; // element-ui lang
import enLocale from './en';
import viLocale from './vi';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  vi: {
    ...viLocale,
    ...elementViLocale,
  },
};

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  vi: {
    short: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
    long: {
      weekday: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
};

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'symbol',
    },
  },
  vi: {
    currency: {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'symbol',
    },
  },
};

const i18n = new VueI18n({
  // set locale
  // options: en | vi
  locale: Cookies.get('language') || 'vi',
  // set locale messages
  messages,
  // settime format
  dateTimeFormats,
  numberFormats,
});

export default i18n;
