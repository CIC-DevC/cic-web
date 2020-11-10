<template>
  <div class="el-textarea el-input--medium">
    <TextareaAutosize
      ref="textarea"
      class="el-textarea__inner"
      :min-height="minheight"
      :max-height="maxheight"
      :placeholder="placeholder"
      v-model="val"
    />
  </div>
</template>
<script>
export default {
  name: 'custom-textarea',

  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    minheight: {
      type: Number,
      default: 20,
    },
    maxheight: {
      type: Number,
      default: 200,
    },
    maxlength: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      val: null,
    };
  },
  mounted() {
    this.updateMaxLength(this.maxlength);
  },
  methods: {
    updateMaxLength(maxLength) {
      if (maxLength) {
        this.$refs.textarea.$el.setAttribute('maxlength', maxLength);
      }
    },
  },
  watch: {
    value: {
      handler: function(newValue) {
        this.val = newValue;
      },
      deep: true,
      immediate: true,
    },
    val(val) {
      this.$emit('input', val);
    },
  },
};
</script>
