<template>
  <div v-loading="loading" class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <font-awesome-icon icon="envelope" />
        </span>
        <el-input
          v-model="loginForm.email"
          :placeholder="$t('login.email')"
          name="email"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <font-awesome-icon icon="key" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <font-awesome-icon
            :icon="passwordType === 'password' ? 'eye-slash' : 'eye'"
          />
        </span>
      </el-form-item>

      <el-button
        @click="handleLogin"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        >{{ $t('login.logIn') }}</el-button
      >
      <el-row style="text-align: right;">
        <router-link to="/forgot" class="link-forgot">{{
          $t('login.forgot.link')
        }}</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import CustomInput from '@/components/Input';
export default {
  name: 'Login',
  components: { CustomInput },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      loginRules: {
        email: [
          {
            required: true,
            message: this.$t('login.validate.email'),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('login.validate.password'),
            trigger: 'blur',
          },
        ],
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
    };
  },
  mounted() {
    const expired = this.$route.params.sessionExpired
      ? this.$route.params.sessionExpired
      : false;
    if (expired) {
      Message({
        message: this.$t('error.sessionExpired'),
        type: 'error',
        duration: 2 * 1000,
      });
    }
    if (this.$route.params.isLogout) {
      location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
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
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('login', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || '/' });
            })
            .catch(() => {
              this.loading = false;
            });
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
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
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
  .link-forgot {
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
