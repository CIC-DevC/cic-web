export default function(el, binding) {
  if (!binding.value) return;
  // numberic used on a component that's not a input
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      // throw new Error("v-money requires 1 input, found " + els.length)
    } else {
      el = els[0];
    }
  }
  el.oninput = function() {
    el.value = 'a';
    el.dispatchEvent(event('change')); // v-model.lazy
  };
  el.oninput();
  el.dispatchEvent(event('input')); // force format after initialization
}
