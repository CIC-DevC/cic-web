export function Notify(self, title, message, type) {
  self.$notify({
    title: title,
    message: message,
    type: type,
    duration: 2000,
  });
}
export function successNotify(self, message) {
  const showMessage = message;
  self.$notify({
    title: self.$t('notices.title.success'),
    message: showMessage,
    type: 'success',
    duration: 2000,
  });
}
export function invalidNotify(self, message) {
  const showMessage = message;
  self.$notify({
    title: self.$t('notices.title.invalid'),
    message: showMessage,
    type: 'error',
    duration: 2000,
  });
}

export function failNotify(self, message) {
  const showMessage = message;
  self.$notify({
    title: self.$t('notices.title.fail'),
    message: showMessage,
    type: 'error',
    duration: 2000,
  });
}
