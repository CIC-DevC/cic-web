export function isNumber(num) {
  var pattern = /^\d+$/;
  return pattern.test(num); // returns a boolean
}
export function isvalidUsername(username) {
  // allow letters, numbers, and underscores
  var illegalChars = /\W/;

  if (username.value === '') {
    return false;
  } else if (username.length < 5 || username.length > 15) {
    return false;
  } else if (illegalChars.test(username)) {
    return false;
  }
  return true;
}

/* for url */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* Lower case letters */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* Upper case letters */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* Uppercase and lowercase letters */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?))$/;
  return re.test(email);
}

export function validatePhoneNumberVietnam(phone) {
  const regex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
  return regex.test(phone);
}

export function validateImageFile(file, isAllowGif = true) {
  if (!file) {
    return false;
  } else {
    let regex;
    if (isAllowGif) {
      regex = /.(jpg|jpeg|png|gif)$/;
    } else {
      regex = /.(jpg|jpeg|png)$/;
    }
    return regex.test(file.name);
  }
}
