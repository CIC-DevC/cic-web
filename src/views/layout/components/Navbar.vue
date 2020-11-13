<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="search-container">
      <el-input
        v-model="phoneNumberSearch"
        :placeholder="$t('navbar.phoneSearchPlaceholder')"
        prefix-icon="el-icon-search"
        size="small"
        class="search-box"
        @keyup.enter.native="handleSearch"
      >
        <el-button slot="append" @click="handleSearch">{{
          $t('button.check')
        }}</el-button>
      </el-input>
    </div>

    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <el-avatar :src="user.avatar ? user.avatar.file_link : null">{{
            user.name ? user.name.substr(0, 1) : ''
          }}</el-avatar>
          <span
            style="max-width: 100px; margin-left: 8px"
            class="app-one-line"
            >{{ user.name }}</span
          >
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="goto('/account/profile')">
            <i class="el-icon-user"></i>
            {{ $t('navbar.profile') }}
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">
              <i class="el-icon-switch-button"></i>
              {{ $t('navbar.logOut') }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      phoneNumberSearch: '',
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'user', 'device']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    goto(path) {
      this.$router.push(path);
    },
    logout() {
      this.$store
        .dispatch('logOut')
        .then(() => {
          this.$router.push({ name: 'login', params: { isLogout: true } });
        })
        .catch(() => {});
    },
    handleSearch() {},
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  margin-bottom: 0px;
  display: flex;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    min-width: 200px;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
  }

  .search-container {
    flex-grow: 1;
    margin: 0px 30px 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-box {
      min-width: 100px;
      max-width: 800px;
      margin-right: 20px;
    }
  }
}
</style>
