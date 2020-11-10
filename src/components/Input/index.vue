<template>
  <div class="el-input el-input--medium">
    <input
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="val"
      :autocomplete="autocomplete"
      type="text"
      class="el-input__inner"
      @input="updateSelf($event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'CustomInput',
  model: {
    prop: 'val',
    event: 'input',
  },
  props: {
    val: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 250,
    },
  },
  data() {
    return {};
  },
  methods: {
    updateSelf(val) {
      this.$emit('input', val);
    },
  },
};
</script>
