let delayRunTimer = null;
export default {
  bind: function(el, binding, vNode) {
    // Make sure expression provided is a function
    if (typeof binding.value !== 'function') {
      return;
    }
    el.addEventListener('click', (e) => {
      el.setAttribute('disabled', true);
      delayRunTimer = setTimeout(function() {
        el.removeAttribute('disabled');
      }, 1000);
      binding.value();
    });
  },
  reset: function() {
    if (delayRunTimer !== null) {
      clearTimeout(delayRunTimer);
    }
  },
  unbind: function() {
    if (delayRunTimer !== null) {
      clearTimeout(delayRunTimer);
    }
  },
};
