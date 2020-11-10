<template>
  <div class="coverDialog">
    <el-dialog
      v-if="dialogFormVisible"
      :title="$t('profile.changeCover.title')"
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
        class="cover-uploader"
        :disabled="loading"
      >
        <aspect-ratio :ratio="0.37" style="width: 600px;">
          <div
            v-if="coverAsset || coverFile"
            class="background-cover"
            :style="{
              backgroundImage: `url('${
                coverAsset
                  ? coverAsset.file_link
                  : coverFile
                  ? coverFileRaw
                  : ''
              }')`,
            }"
          />
          <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </aspect-ratio>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeCover" type="primary" :loading="loading">{{
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
import AspectRatio from '@/components/AspectRadio';
import { compressImage } from '@/utils/index';
import { validateImageFile } from '@/utils/validate';

export default {
  name: 'changeCover',
  components: { AspectRatio },
  data() {
    return {
      isValid: true,
      coverFile: undefined,
      coverAsset: undefined,
      coverFileRaw: undefined,
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
      this.coverFile = undefined;
      this.coverAsset = undefined;
      this.coverFileRaw = undefined;
    },
    async changeCover() {
      // if (this.validateForm()) {
      //   this.loading = true;
      //   if (!this.coverAsset) {
      //     await this.uploadFile();
      //     if (!this.coverAsset) {
      //       this.loading = false;
      //       return;
      //     }
      //   }
      //   changeCoverOwner(this.coverAsset.asset_id)
      //     .then((response) => {
      //       if (response && response.data) {
      //         successNotify(
      //           this,
      //           this.$t('profile.changeCover.message.changeCoverSuccess')
      //         );
      //         const temp = Object.assign({}, this.user);
      //         temp.cover_img = response.data;
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
      if (!this.coverAsset) {
        if (!this.coverFile) {
          invalidNotify(
            this,
            this.$t('profile.changeCover.validate.coverRequired')
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
        this.coverFile = file.file;
        this.$emit('changeImage', this.coverFile);
        var fr = new FileReader();
        const self = this;
        fr.onload = (ev) => {
          self.coverFileRaw = ev.target.result;
        };
        fr.readAsDataURL(file.file);
      }
    },
    fileChange(file, fileList) {
      this.isValid = file.size < 10 * 1024 * 1024;
    },
    async uploadFile() {
      let file = null;
      await compressImage(this, this.coverFile, {
        maxWidth: 1200,
        checkOrientation: this.coverFile < 2097152 * 5,
      })
        .then((fileResult) => {
          file = fileResult;
        })
        .catch(() => {});
      if (file) {
        // await uploadFilePublic(file)
        //   .then((response) => {
        //     if (response && response.data) {
        //       this.coverFile = undefined;
        //       this.coverAsset = response.data;
        //     }
        //   })
        //   .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss">
$width-cover: 600px;
.coverDialog {
  .cover-uploader {
    margin: auto;
    width: $width-cover;
    .el-upload {
      border: 2px dashed #d9d9d9;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .cover-uploader-icon {
      font-size: 40px;
      color: #8c939d;
      width: $width-cover;
      line-height: $width-cover * 0.37;
      text-align: center;
    }
    .background-cover {
      width: $width-cover;
      display: block;
      background-color: whitesmoke;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
</style>
