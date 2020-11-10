import dayjs from 'dayjs';

export function getDateAsString(date) {
  if (date) {
    let d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  } else return '';
}

export function toStringDate(date, format) {
  const dateMoment = dayjs(date);
  return dateMoment.format(format);
}

export function convertStringToDate(dateString, format) {
  return dayjs(dateString, format).toDate();
}
