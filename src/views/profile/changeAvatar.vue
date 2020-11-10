<template>
  <div class="avatarDialog">
    <el-dialog
      v-if="dialogFormVisible"
      :title="$t('profile.changeAvatar.title')"
      :visible.sync="dialogFormVisible"
      :before-close="cancelClose"
      :show-close="false"
    >
      <el-upload
        :accept="'image/png,image/jpeg'"
        :multiple="false"
        :http-request="addFile"
        :auto-upload="true"
        :show-file-list="false"
        :on-change="fileChange"
        action
        class="avatar-uploader"
        :disabled="loading"
      >
        <aspect-ratio v-if="avatarAsset || avatarFile" class="avatar">
          <el-avatar
            :src="
              avatarAsset
                ? avatarAsset.file_link
                : avatarFile
                ? avatarFileRaw
                : ''
            "
            class="avatar"
          ></el-avatar>
        </aspect-ratio>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeAvatar" type="primary" :loading="loading">{{
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
import { cancelClose } from '@/utils/form';
import { invalidNotify, successNotify } from '@/utils/notices';
import { mapGetters } from 'vuex';
import store from '@/store';
import { compressImage } from '@/utils/index';
import AspectRatio from '@/components/AspectRadio';
import { validateImageFile } from '@/utils/validate';

export default {
  name: 'changeAvatar',
  components: { AspectRatio },
  data() {
    return {
      isValid: true,
      avatarFile: undefined,
      avatarAsset: undefined,
      avatarFileRaw: undefined,
      dialogFormVisible: false,
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
      this.loading = false;
      this.isValid = true;
      this.avatarFile = undefined;
      this.avatarAsset = undefined;
      this.avatarFileRaw = undefined;
    },
    async changeAvatar() {
      // if (this.validateForm()) {
      //   this.loading = true;
      //   if (!this.avatarAsset) {
      //     await this.uploadFile();
      //     if (!this.avatarAsset) {
      //       this.loading = false;
      //       return;
      //     }
      //   }
      //   changeAvatarOwner(this.avatarAsset.asset_id)
      //     .then((response) => {
      //       if (response && response.data) {
      //         successNotify(
      //           this,
      //           this.$t('profile.changeAvatar.message.changeAvatarSuccess')
      //         );
      //         const temp = Object.assign({}, this.user);
      //         temp.avatar = response.data;
      //         store.commit('SET_USER', temp);
      //       }
      //       this.loading = false;
      //       this.dialogFormVisible = false;
      //     })
      //     .catch(() => {
      //       this.dialogFormVisible = false;
      //     });
      // }
    },
    validateForm() {
      if (!this.avatarAsset) {
        if (!this.avatarFile) {
          invalidNotify(
            this,
            this.$t('profile.changeAvatar.validate.avatarRequired')
          );
          return false;
        }
      }
      return true;
    },
    addFile(file) {
      if (!validateImageFile(file.file, false)) {
        invalidNotify(this, this.$t('error.notImageFile'));
      } else if (!this.isValid) {
        invalidNotify(
          this,
          this.$t('component.imageUpload.validate.importFileSize')
        );
      } else {
        this.avatarFile = file.file;
        this.$emit('changeImage', this.avatarFile);
        var fr = new FileReader();
        const self = this;
        fr.onload = (ev) => {
          self.avatarFileRaw = ev.target.result;
        };
        fr.readAsDataURL(file.file);
      }
    },
    fileChange(file, fileList) {
      this.isValid = file.size < 10 * 1024 * 1024;
    },
    async uploadFile() {
      let file = null;
      await compressImage(this, this.avatarFile, {
        maxWidth: 320,
        checkOrientation: this.avatarFile < 2097152 * 5,
      })
        .then((fileResult) => {
          file = fileResult;
        })
        .catch(() => {});
      if (file) {
        // await uploadFilePublic(file)
        //   .then((response) => {
        //     if (response && response.data) {
        //       this.avatarFile = undefined;
        //       this.avatarAsset = response.data;
        //     }
        //   })
        //   .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss">
$width-avatar: 300px;
.avatarDialog {
  .avatar-uploader {
    margin: auto;
    width: $width-avatar;
    .el-upload {
      border: 2px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 40px;
      color: #8c939d;
      width: $width-avatar;
      height: $width-avatar;
      line-height: $width-avatar;
      text-align: center;
    }
    .avatar {
      width: $width-avatar;
      height: $width-avatar;
    }
  }
}
</style>
