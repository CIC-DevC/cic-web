import Compressor from 'compressorjs';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function compressImage(vm, file, option) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      convertSize: Infinity,
      success: (result) => {
        const fileResult = new File([result], file.name, {
          type: result.type,
        });
        resolve(fileResult);
      },
      error: (err) => {
        vm.$message.warning(vm.$t('error.compressFileError'));
        reject(err);
      },
      ...option,
    });
  });
}
