<template>
  <el-dialog
    :title="title"
    :visible.sync="data.visible"
    :before-close="cancelClose"
    :show-close="false"
    @close="$emit('close')"
    width="300px"
  >
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane
        name="tabFromFile"
        :label="$t('component.imageModal.tab.fromComputer')"
      >
        <el-form
          ref="importForm"
          label-position="left"
          label-width="110px"
          style="min-width: 200px; margin-left: 20px;"
        >
          <el-form-item :label="$t('component.imageModal.label.chooseFile')">
            <div class="file-upload">
              <div :class="['file-select', !isValid ? 'file-danger' : '']">
                <div
                  id="fileName"
                  class="file-select-button"
                  onclick="document.getElementById('file').click()"
                  style="width: 80px;"
                >
                  {{ $t('component.imageModal.button.chooseFile') }}
                </div>
                <div
                  id="noFile"
                  class="file-select-name"
                  onclick="document.getElementById('file').click()"
                >
                  {{
                    fileInput
                      ? fileInput.name
                      : $t('component.imageModal.label.notChooseFile')
                  }}
                </div>
                <el-input
                  id="file"
                  ref="files"
                  v-model="file"
                  type="file"
                  :accept="accept"
                  @change="validateFile"
                />
              </div>
            </div>
            <div v-if="!isValid" class="el-form-item__error">
              {{ invalidMessage }}
            </div>
          </el-form-item>
          <div style="float: right; margin-top: 20px;">
            <el-button
              @click="handleFile"
              :loading="data.loading"
              type="primary"
              >{{ $t('button.OK') }}</el-button
            >
            <el-button @click="btnclose">{{ $t('button.cancel') }}</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        name="tabUrl"
        :label="$t('component.imageModal.tab.fromUrl')"
      >
        <el-form
          ref="importForm"
          label-position="left"
          label-width="130px"
          style="min-width: 200px; margin-left: 20px;"
        >
          <el-form-item :label="$t('component.imageModal.label.linkUrl')">
            <el-input v-model="urlInput" type="text" placeholder="" />
            <div v-if="!isValidUrl" class="el-form-item__error">
              {{ invalidMessage }}
            </div>
          </el-form-item>
          <div style="float: right; margin-top: 20px;">
            <el-button @click="handleUrl" type="primary">{{
              $t('button.OK')
            }}</el-button>
            <el-button @click="btnclose">{{ $t('button.cancel') }}</el-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { cancelClose } from '@/utils/form';
export default {
  name: 'ImageModal',
  props: {
    data: {
      type: Object,
      default: {
        visible: false,
        loading: false,
      },
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      isValid: true,
      isValidUrl: true,
      invalidMessage: '',
      file: undefined,
      fileInput: undefined,
      urlInput: undefined,
      currentTab: 'tabFromFile',
    };
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function(val) {
        if (val.visible) {
          this.file = undefined;
          this.fileInput = undefined;
          this.urlInput = undefined;
          this.isValid = true;
          this.isValidUrl = true;
          this.currentTab = 'tabFromFile';
        }
      },
    },
  },
  methods: {
    cancelClose,
    btnclose() {
      this.data.visible = false;
      this.data.loading = false;
    },
    validateFile() {
      this.invalidMessage = '';
      this.isValid = false;
      this.fileInput = this.$refs.files.$refs.input.files[0];
      this.isValid = this.fileInput !== undefined;
      if (this.isValid) {
        if (this.fileInput.size >= 10 * 1024 * 1024) {
          this.isValid = false;
          this.invalidMessage = this.$t(
            'component.insertImage.validate.fileMaxSize'
          );
        } else {
          this.isValid = true;
        }
      } else {
        this.invalidMessage = this.$t(
          'component.insertImage.validate.fileRequired'
        );
      }
    },
    handleFile() {
      this.validateFile();
      if (this.isValid) {
        this.$emit('handleFile', this.fileInput);
      }
    },
    handleUrl() {
      this.isValidUrl = this.urlInput && this.urlInput !== '';
      if (this.isValidUrl) {
        this.$emit('handleUrl', this.urlInput);
      } else {
        this.invalidMessage = this.$t(
          'component.insertImage.validate.urlRequired'
        );
      }
    },
  },
};
</script>

<style module>
.file-danger {
  border: 2px solid #f56c6c !important;
}
.file-upload {
  display: block;
  text-align: center;
  font-size: 12px;
}
.file-upload .file-select {
  display: block;
  border: 2px solid #dce4ec;
  color: #34495e;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  text-align: left;
  background: #ffffff;
  overflow: hidden;
  position: relative;
}
.file-upload .file-select .file-select-button {
  background: #dce4ec;
  padding: 0 10px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  width: 60px;
}

.file-upload .file-select .file-select-name {
  line-height: 40px;
  display: inline-block;
  padding: 0 10px;
}
</style>
