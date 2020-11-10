// Check current formtype 2: View Mode, 0 : Create mode, 1 : Edit mode
export function cancelClose() {
  return false;
}

export function focusInputInvalid(self, refName) {
  self.$nextTick(() => {
    self.$refs[refName].$on('change', (evt) => {
      self.$refs[refName].$parent.$el.classList.remove('is-error');
      self.$refs[refName].$off('change');
    });
    self.$refs[refName].focus();
    self.$refs[refName].$parent.$el.classList.add('is-error');
  });
}
