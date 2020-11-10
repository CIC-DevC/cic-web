<template>
  <div style="padding: 0px 15px 20px 15px">
    <div class="profile">
      <div class="header">
        <aspect-ratio :ratio="0.37">
          <div
            class="background-cover"
            :style="{
              backgroundImage: `url('${
                user.cover_img ? user.cover_img.file_link : ''
              }')`,
            }"
          >
            <div class="avatar-wrap">
              <aspect-ratio>
                <el-avatar
                  :src="user.avatar ? user.avatar.file_link : null"
                  class="avatar"
                  >{{ user.name ? user.name.substr(0, 1) : '' }}</el-avatar
                >
              </aspect-ratio>
              <el-button
                icon="el-icon-camera"
                circle
                class="btn-edit-avatar"
                @click="openChangeAvatarDialog"
              ></el-button>
            </div>
          </div>
        </aspect-ratio>
        <el-button
          icon="el-icon-camera"
          circle
          class="btn-edit-cover"
          @click="openChangeCoverDialog"
        ></el-button>
      </div>

      <div class="body">
        <userInfo userId></userInfo>
      </div>
    </div>

    <changeAvatarDialog ref="changeAvatarDialog" />
    <changeCoverDialog ref="changeCoverDialog" />
  </div>
</template>

<script>
import AspectRatio from '@/components/AspectRadio';
import userInfo from './userInfo';
import { mapGetters } from 'vuex';
import changeAvatarDialog from './changeAvatar';
import changeCoverDialog from './changeCover';

export default {
  components: {
    AspectRatio,
    userInfo,
    changeAvatarDialog,
    changeCoverDialog,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userId', 'user']),
  },
  created() {},
  methods: {
    openChangeAvatarDialog() {
      this.$refs.changeAvatarDialog.openDialog();
    },
    openChangeCoverDialog() {
      this.$refs.changeCoverDialog.openDialog();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.profile {
  width: 100%;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  .header {
    position: relative;
    margin-bottom: 40px;
    .avatar-wrap {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, -80%);
      width: 15%;
      .avatar {
        box-shadow: 0 0 0 3px white, 0 5px 10px -2px rgba(black, 0.2);
        display: inline-grid;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 40px;
      }
      .btn-edit-avatar {
        position: absolute;
        right: 0;
        bottom: 10%;
      }
    }
    @media only screen and (max-width: 575px) {
      .avatar-wrap {
        width: 20%;
        .btn-edit-avatar {
          bottom: 0;
        }
      }
    }

    .btn-edit-cover {
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 40px;
      height: 40px;
      font-size: 16px;
      background-color: rgba(white, 0.6);
    }
  }
}
@media only screen and (min-width: 1300px) {
  .profile {
    max-width: 900px;
  }
}
@media only screen and (min-width: 1400px) {
  .profile {
    max-width: 1000px;
  }
}
@media only screen and (min-width: 1920px) {
  .profile {
    max-width: 1140px;
  }
}
.background-cover {
  background-color: whitesmoke;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
::v-deep {
  .profile-tabs {
    .el-tabs__content {
      padding: 10px;
    }
  }
}
</style>
