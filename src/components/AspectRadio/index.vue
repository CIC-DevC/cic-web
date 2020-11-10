<template>
  <div class="ratio" :style="{ 'padding-top': `${getPadding}%` }">
    <div class="ratio-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: [String, Number],
      default: 1, // 1:1
    },
  },
  data() {
    return {
      regex: /^[1-9]+[0-9]*:[1-9]+[0-9]*$/gim,
    };
  },
  computed: {
    getPadding() {
      if (typeof this.ratio === 'string') {
        const ratio = this.ratio.trim();
        if (this.regex.test(ratio)) {
          const dimension = ratio.trim().split(':');
          return (dimension[1] * 100) / dimension[0];
        } else {
          return 100;
        }
      } else if (typeof this.ratio === 'number') {
        return this.ratio * 100;
      } else {
        return 100;
      }
    },
  },
};
</script>

<style rel="stylesheet/csss" lang="scss" scoped>
.ratio {
  position: relative;
  display: block;

  .ratio-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    > div {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
