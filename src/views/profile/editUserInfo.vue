<template>
  <div>
    <el-dialog
      v-if="dialogFormVisible"
      :title="$t('profile.editUserInfo.title')"
      :visible.sync="dialogFormVisible"
      :before-close="cancelClose"
      :show-close="false"
    >
      <el-form
        ref="updateUserForm"
        label-position="top"
        style="min-width: 400px; padding: 0px 40px;"
        autocomplete="off"
        size="small"
        class="updateUserForm"
        v-loading="loading"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item
              :label="$t('profile.editUserInfo.label.userId')"
              required
            >
              <el-input
                ref="userId"
                v-model="userForm.id"
                autocomplete="off"
                type="text"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('profile.editUserInfo.label.email')"
              required
            >
              <el-input
                ref="email"
                v-model="userForm.email"
                autocomplete="off"
                type="email"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('profile.editUserInfo.label.name')" required>
          <el-input
            ref="name"
            v-model="userForm.name"
            autocomplete="off"
            type="text"
          />
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item :label="$t('profile.editUserInfo.label.address')">
              <el-input
                ref="address"
                v-model="userForm.address"
                autocomplete="off"
                type="text"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item :label="$t('profile.editUserInfo.label.phone')">
              <el-input
                ref="phone"
                v-model="userForm.phone"
                autocomplete="off"
                type="tel"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="$t('profile.editUserInfo.label.description')">
          <el-input
            ref="description"
            type="textarea"
            maxlength="500"
            show-word-limit
            v-model="userForm.description"
            autocomplete="off"
            :autosize="{ minRows: 4 }"
            resize="none"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUser" type="primary" :loading="loading">{{
          $t('button.save')
        }}</el-button>
        <el-button @click="dialogFormVisible = false" :disabled="loading">{{
          $t('button.cancel')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cancelClose, focusInputInvalid } from '@/utils/form';
import { invalidNotify, successNotify } from '@/utils/notices';
import { mapGetters } from 'vuex';
import store from '@/store';
import { validatePhoneNumberVietnam } from '@/utils/validate';

export default {
  name: 'editUserInfo',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      userForm: {
        id: undefined,
        email: '',
        name: '',
        address: '',
        phone: '',
        description: '',
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {},
  methods: {
    cancelClose,
    openDialog() {
      this.dialogFormVisible = true;
      const temp = Object.assign({}, this.user);
      this.userForm = {
        id: temp.user_id,
        email: temp.email,
        name: temp.name,
        address: temp.address,
        phone: temp.phone,
        description: temp.description,
      };
      this.loading = false;
    },
    updateUser() {
      if (this.validateForm()) {
      }
    },
    validateForm() {
      if (!this.userForm.name || this.userForm.name.trim() === '') {
        invalidNotify(
          this,
          this.$t('profile.editUserInfo.validate.nameRequired')
        );
        focusInputInvalid(this, 'name');
        return false;
      } else {
        this.userForm.name = this.userForm.name.trim();
      }

      if (
        this.userForm.phone &&
        this.userForm.phone !== '' &&
        !validatePhoneNumberVietnam(this.userForm.phone)
      ) {
        invalidNotify(
          this,
          this.$t('profile.editUserInfo.validate.phoneInvalid')
        );
        focusInputInvalid(this, 'phone');
        return false;
      }

      return true;
    },
  },
};
</script>
<style lang="scss">
.updateUserForm {
  .el-form-item__label {
    padding-bottom: 0px;
    font-size: 12px;
  }
}
</style>
