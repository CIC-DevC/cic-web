<template>
  <div class="changePasswordDialog">
    <el-dialog
      v-if="dialogFormVisible"
      :title="$t('profile.changePassword.title')"
      :visible.sync="dialogFormVisible"
      :before-close="cancelClose"
      :show-close="false"
    >
      <el-form
        ref="changePasswordForm"
        label-position="top"
        autocomplete="off"
        size="small"
        class="changePasswordForm"
        v-loading="loading"
      >
        <el-form-item
          :label="$t('profile.changePassword.label.oldPassword')"
          required
        >
          <el-input
            ref="oldPassword"
            v-model="form.oldPassword"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
        <el-form-item
          :label="$t('profile.changePassword.label.newPassword')"
          required
        >
          <el-input
            ref="newPassword"
            v-model="form.newPassword"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
        <el-form-item
          :label="$t('profile.changePassword.label.confirmPassword')"
          required
        >
          <el-input
            ref="confirmPassword"
            v-model="form.confirmPassword"
            autocomplete="off"
            type="password"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePassword" type="primary" :loading="loading">
          {{ $t('profile.changePassword.button.change') }}
        </el-button>
        <el-button @click="dialogFormVisible = false" :disabled="loading">
          {{ $t('button.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cancelClose, focusInputInvalid } from '@/utils/form';
import { invalidNotify, successNotify } from '@/utils/notices';

export default {
  name: 'changePassword',
  components: {},
  data() {
    return {
      form: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      },
      dialogFormVisible: false,
      loading: false,
    };
  },
  created() {},
  methods: {
    cancelClose,
    openDialog() {
      this.dialogFormVisible = true;
      this.loading = false;
      this.form = {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      };
    },
    changePassword() {
      // if (this.validateForm()) {
      //   this.loading = true;
      //   changePasswordOwner(this.form.oldPassword, this.form.newPassword)
      //     .then((res) => {
      //       successNotify(
      //         this,
      //         this.$t('profile.changePassword.message.changePasswordSuccess')
      //       );
      //       this.loading = false;
      //       this.dialogFormVisible = false;
      //     })
      //     .catch(() => {
      //       this.loading = false;
      //     });
      // }
    },
    validateForm() {
      if (!this.form.oldPassword) {
        invalidNotify(
          this,
          this.$t('profile.changePassword.validate.oldPasswordRequired')
        );
        focusInputInvalid(this, 'oldPassword');
        return false;
      }
      if (!this.form.newPassword) {
        invalidNotify(
          this,
          this.$t('profile.changePassword.validate.newPasswordRequired')
        );
        focusInputInvalid(this, 'newPassword');
        return false;
      } else if (this.form.newPassword.length < 6) {
        invalidNotify(
          this,
          this.$t('profile.changePassword.validate.newPasswordInvalid')
        );
        focusInputInvalid(this, 'newPassword');
        return false;
      }
      if (!this.form.confirmPassword) {
        invalidNotify(
          this,
          this.$t('profile.changePassword.validate.confirmPasswordRequired')
        );
        focusInputInvalid(this, 'confirmPassword');
        return false;
      } else if (this.form.confirmPassword !== this.form.newPassword) {
        invalidNotify(
          this,
          this.$t('profile.changePassword.validate.confirmPasswordInvalid')
        );
        focusInputInvalid(this, 'confirmPassword');
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
.changePasswordDialog {
  .el-dialog {
    width: 400px;
    min-width: 300px;
    .el-dialog__body {
      padding: 10px 40px 0px 40px;
    }
  }
}

.changePasswordForm {
  .el-form-item__label {
    padding-bottom: 0px;
    font-size: 12px;
  }
}
</style>
