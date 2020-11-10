<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div style="font-size: 20px;">
      <font-awesome-icon icon="globe" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'vi'" command="vi">
        {{ $t('language.vi') }}
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        {{ $t('language.en') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch('setLanguage', lang);
      this.$message({
        message: this.$t('form.message.switchLang'),
        type: 'success',
        duration: 1000,
        onClose: this.reload,
      });
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>
