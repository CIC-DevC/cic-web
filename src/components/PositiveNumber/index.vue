<template>
  <div :style="{ width: width }" :class="cssClass" class="el-input">
    <input
      v-model="num"
      :placeholder="placeholder"
      class="el-input__inner"
      onpaste="return false"
      @blur="onBlurHandler"
      @input="onInputHandler"
      @focus="onFocusHandler"
      @keypress="isNumber($event)"
    />
  </div>
</template>
<script>
export default {
  name: 'PositiveNumber',
  components: {},
  props: {
    value: {
      type: [Number, String],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
      required: false,
    },
    width: {
      type: String,
      default: '150px',
    },
    cssClass: {
      type: String,
      default: 'el-input--medium',
    },
  },
  data: () => ({
    num: '',
  }),
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.num = val;
      },
    },
  },
  mounted() {
    // Set default value props when placeholder undefined.
    if (!this.placeholder) {
      this.num = this.value;
    }
  },
  methods: {
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    /**
     * Handle blur event.
     * @param {Object} e
     */
    onBlurHandler(e) {
      this.$emit('blur', e);
      this.num = this.value;
    },
    /**
     * Handle focus event.
     * @param {Object} e
     */
    onFocusHandler(e) {
      this.$emit('focus', e);
      if (this.value === null || this.value === undefined) {
        this.num = null;
      } else {
        this.num = this.value;
      }
    },
    /**
     * Handle input event.
     */
    onInputHandler() {
      this.update(this.num);
    },

    /**
     * Update parent component model value.
     * @param {Number} value
     */
    update(value) {
      this.$emit('input', value);
    },
  },
};
</script>
