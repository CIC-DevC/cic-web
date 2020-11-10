<template>
  <div class="imageUpload upload-container">
    <div
      v-if="
        (imageUrl && imageUrl.length > 1) ||
          (defaultUrl && defaultUrl.length > 1) ||
          imgFile
      "
      class="image-preview"
    >
      <div class="image-preview-wrapper">
        <img
          :src="imageUrl ? imageUrl : imgFile ? imgFileRaw : defaultUrl"
          style="max-width: 100%"
        />
        <div class="image-preview-action">
          <el-popover
            placement="bottom"
            width="220"
            trigger="click"
            :visible-arrow="false"
            v-model="isVisibleDialogConfirm"
          >
            <p style="text-align: left">
              {{ $t('component.imageUpload.message.deleteImageConfirm') }}
            </p>
            <div style="text-align: right; margin: 0">
              <el-button type="primary" size="mini" @click="rmImage">
                {{ $t('button.OK') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="isVisibleDialogConfirm = false"
                >{{ $t('button.cancel') }}</el-button
              >
            </div>
            <i slot="reference" class="el-icon-delete" />
          </el-popover>
        </div>
      </div>
    </div>
    <el-upload
      v-else
      :accept="'image/png,image/jpeg'"
      :multiple="false"
      :http-request="addFile"
      :auto-upload="true"
      :show-file-list="false"
      :on-change="fileChange"
      action
      class="image-uploader"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        {{ $t('component.imageUpload.message.upload') }}
      </div>
    </el-upload>
  </div>
</template>

<script>
import { invalidNotify } from '@/utils/notices';
import { validateImageFile } from '@/utils/validate';

export default {
  name: 'ImageUpload',
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
    defaultImg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      defaultUrl: '',
      isValid: true,
      isVisibleDialogConfirm: false,
      imgFile: undefined,
      imgFileRaw: undefined,
    };
  },
  mounted() {
    this.defaultUrl = this.defaultImg ? this.defaultImg : '';
  },
  methods: {
    rmImage() {
      this.isVisibleDialogConfirm = false;
      this.$emit('removeImage');
      this.imgFile = undefined;
      this.imgFileRaw = undefined;
      this.defaultUrl = '';
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
        this.imgFile = file.file;
        this.$emit('changeImage', this.imgFile);
        var fr = new FileReader();
        const self = this;
        fr.onload = (ev) => {
          self.imgFileRaw = ev.target.result;
        };
        fr.readAsDataURL(file.file);
      }
    },
    fileChange(file, fileList) {
      this.isValid = file.size < 10 * 1024 * 1024;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  position: relative;
  .image-uploader {
    width: 100%;
    display: inline-block;
    .el-upload__text {
      line-height: 14px;
      padding: 20px;
    }
  }
  .image-preview {
    width: 100%;
    height: auto;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
    .image-preview-wrapper {
      width: 100%;
      max-height: 500px;
      img {
        max-height: 500px;
        height: auto;
      }
    }
    .image-preview-action {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
