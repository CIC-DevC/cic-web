<template>
  <div style="padding: 0px 30px">
    <div class="info-header">
      <el-button
        icon="el-icon-edit-outline"
        @click="openUpdateUserInfoDialog"
        >{{ $t('profile.userInfo.button.edit') }}</el-button
      >
      <el-button @click="openChangePasswordDialog">
        <font-awesome-icon icon="shield-alt" style="margin-right: 5px" />
        {{ $t('profile.userInfo.button.security') }}
      </el-button>
    </div>
    <el-row :gutter="30">
      <el-col :xl="6" :md="8" :sm="9">
        <h3>{{ $t('profile.userInfo.label.info') }}</h3>

        <div class="info-wrap">
          <div class="info-item">
            <label>{{ $t('profile.userInfo.label.name') }}</label>
            <p>{{ user.name }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.userInfo.label.email') }}</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.userInfo.label.phone') }}</label>
            <p>{{ user.phone }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.userInfo.label.address') }}</label>
            <p>{{ user.address }}</p>
          </div>
        </div>
      </el-col>
      <el-col :xl="18" :md="16" :sm="15">
        <h3>{{ $t('profile.userInfo.label.description') }}</h3>
        <span style="white-space: pre-wrap;">{{ user.description }}</span>
      </el-col>
    </el-row>

    <editUserInfoDialog ref="editUserInfoDialog" />
    <changePasswordDialog ref="changePasswordDialog" />
  </div>
</template>

<script>
import editUserInfoDialog from './editUserInfo';
import changePasswordDialog from './changePassword';
import { mapGetters } from 'vuex';
export default {
  components: {
    editUserInfoDialog,
    changePasswordDialog,
  },
  data() {
    return {
      dialogSecurityVisible: false,
      dialogEditVisible: false,
    };
  },
  computed: {
    ...mapGetters(['userId', 'user']),
  },
  methods: {
    openUpdateUserInfoDialog() {
      this.$refs.editUserInfoDialog.openDialog();
    },
    openChangePasswordDialog() {
      this.$refs.changePasswordDialog.openDialog();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.info-header {
  display: flex !important;
  flex-wrap: wrap;
  justify-content: flex-end !important;
}
.info-wrap {
  .info-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    margin: 0.5em 0;
    label {
      margin-bottom: 0px;
    }
    p {
      margin: 0px 0px 0px 10px;
    }
  }
}
</style>
