<template>
  <div v-loading="loading" class="login-container">
    <el-form
      ref="verifyForm"
      :model="resetPassword"
      :rules="verifyRules"
      class="login-form"
      autocomplete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.reset.title') }}</h3>
        <span class="desc">{{ $t('login.reset.desc') }}</span>
      </div>
      <el-form-item prop="password">
        <span class="svg-container">
          <font-awesome-icon icon="key" />
        </span>
        <el-input
          v-model="resetPassword.password"
          :type="passwordType"
          :placeholder="$t('login.reset.password')"
          name="password"
          autocomplete="off"
          @keyup.enter.native="handleReset"
        />
        <span class="show-pwd" @click="showPwd">
          <font-awesome-icon
            :icon="passwordType === 'password' ? 'eye-slash' : 'eye'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="verify">
        <span class="svg-container">
          <font-awesome-icon icon="key" />
        </span>
        <el-input
          v-model="resetPassword.verify"
          :type="passwordType1"
          :placeholder="$t('login.reset.verify')"
          name="password"
          autocomplete="off"
          @keyup.enter.native="handleReset"
        />
        <span class="show-pwd" @click="showPwd1">
          <font-awesome-icon
            :icon="passwordType1 === 'password' ? 'eye-slash' : 'eye'"
          />
        </span>
      </el-form-item>
      <el-button
        @click="handleReset"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        >{{ $t('login.reset.button') }}</el-button
      >
      <el-row style="text-align: right;">
        <router-link to="/login" class="link-login">{{
          $t('login.link')
        }}</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { successNotify } from '@/utils/notices';
import CustomInput from '@/components/Input';
export default {
  name: 'ResetPassword',
  components: { CustomInput },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error(this.$t('login.reset.validate.passwordRequired')));
      } else if (value.length < 6) {
        callback(new Error(this.$t('login.reset.validate.passwordInvalid')));
      } else {
        if (this.resetPassword.verify !== '') {
          this.$refs.verifyForm.validateField('verify');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value || value === '') {
        callback(
          new Error(this.$t('login.reset.validate.confirmPasswordRequired'))
        );
      } else if (value !== this.resetPassword.password) {
        callback(
          new Error(this.$t('login.reset.validate.confirmPasswordInvalid'))
        );
      } else {
        callback();
      }
    };
    return {
      resetPassword: {
        password: '',
        verify: '',
      },
      verifyRules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        verify: [{ validator: validatePass2, trigger: 'blur' }],
      },
      passwordType: 'password',
      passwordType1: 'password',
      loading: false,
      token: undefined,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.token = route.query && route.query.token;
        if (!this.token) {
          this.$router.push('/login');
        }
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    showPwd1() {
      if (this.passwordType1 === 'password') {
        this.passwordType1 = '';
      } else {
        this.passwordType1 = 'password';
      }
    },
    handleReset() {
      this.$refs.verifyForm.validate((valid) => {
        if (valid) {
          // this.loading = true;
          // this.$store.dispatch('logOut');
          // resetPassword(this.token, this.resetPassword.password).then(
          //   (response) => {
          //     this.loading = false;
          //     successNotify(this, this.$t('login.reset.successMessage'));
          //     this.$router.push('/login');
          //   },
          //   (err) => {
          //     this.loading = false;
          //   }
          // );
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  padding-bottom: 20px;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    margin-bottom: 20px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 10px auto;
      text-align: center;
      font-weight: bold;
    }
    .desc {
      color: $light_gray;
      text-align: center;
      font-style: italic;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .link-login {
    color: #fff;
    font-size: 14px;
  }
}

::v-deep {
  a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
