<template>
  <div class="errPage-container">
    <el-row>
      <h2 class="text-ginormous">{{ label }}</h2>
      <span>{{ message }}</span>
    </el-row>
    <el-button
      icon="el-icon-back"
      class="pan-back-btn"
      @click="back"
      type="primary"
      size="small"
    >
      {{ $t('page.back') }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    label: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  padding: 50px 100px;
  .pan-back-btn {
    margin-top: 20px;
  }
}
</style>
