<template>
  <el-dialog
    :title="title"
    :visible.sync="data.visible"
    :before-close="cancelClose"
    :show-close="false"
    @close="$emit('close')"
  >
    <el-form
      ref="importForm"
      label-position="left"
      label-width="120px"
      style="min-width: 400px; margin-left:50px;"
    >
      <el-form-item :label="$t('form.field.file')">
        <div class="file-upload">
          <div :class="['file-select', !isValid ? 'file-danger' : '']">
            <div
              id="fileName"
              class="file-select-button"
              onclick="document.getElementById('file').click()"
            >
              {{ $t('component.file.button.chooseFile') }}
            </div>
            <div
              id="noFile"
              class="file-select-name"
              onclick="document.getElementById('file').click()"
            >
              {{ fileInput ? fileInput.name : $t('form.file.title') }}
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close" @click="btnclose">{{
        $t('button.cancel')
      }}</el-button>
      <el-button
        v-one-click="handleImport"
        :loading="data.loading"
        icon="el-icon-document-copy"
        type="primary"
        >{{ $t('button.OK') }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { cancelClose } from '@/utils/form';
import { invalidNotify } from '@/utils/notices';
export default {
  name: 'FileModal',
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
      default:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      isValid: true,
      invalidMessage: '',
      file: undefined,
      fileInput: undefined,
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
          this.isValid = true;
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
        if (this.fileInput.size > 5 * 1024 * 1024) {
          this.isValid = false;
          this.invalidMessage = this.$t('form.validate.importFileSize');
        } else {
          this.isValid = true;
        }
      } else {
        this.invalidMessage = this.$t('form.validate.required.file');
      }
    },
    handleImport() {
      this.validateFile();
      if (this.isValid) {
        this.$emit('importFile', this.fileInput);
      } else {
        invalidNotify(this);
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
}
.file-upload .file-select .file-select-name {
  line-height: 40px;
  display: inline-block;
  padding: 0 10px;
}
</style>
