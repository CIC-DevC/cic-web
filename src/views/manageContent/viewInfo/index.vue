<template>
  <div class="view-info">
    <el-dialog
      v-if="isVisibleDialog"
      :title="$t('manageContent.viewInfo.title')"
      :visible.sync="isVisibleDialog"
      width="900px"
      @close="handleClose"
    >
      <div v-loading="loading" style="padding: 0px 20px">
        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.contentType') }}
          </span>
          <span>{{ getContentTypeName(content.content_type) }}</span>
        </div>
        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.createdAt') }}
          </span>
          <span v-if="content.created_at">
            {{
              toStringDate(
                content.created_at,
                $t('common.formatDateTimeMoment')
              )
            }}
          </span>
        </div>
        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.title') }}
          </span>
          <span>{{ content.title }}</span>
        </div>
        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.description') }}
          </span>
          <div class="view-info-body" style="white-space: pre-wrap;">
            <span>{{ content.description }}</span>
          </div>
        </div>
        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.avatar') }}
          </span>
          <div class="view-info-body">
            <img
              v-if="content.cover_img"
              :src="content.cover_img.file_link"
              class="avatar-content"
            />
          </div>
        </div>

        <div class="view-info-item">
          <span class="view-info-label">
            {{ $t('manageContent.viewInfo.label.content') }}
          </span>
          <div
            v-if="content.content"
            v-html="content.content"
            class="view-info-body html-container html-content"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';

export default {
  components: {},
  data() {
    return {
      content: {},
      listContentTypes: [
        {
          id: 1,
          name: this.$t('contentType.event'),
        },
        {
          id: 2,
          name: this.$t('contentType.recruitment'),
        },
      ],
      loading: false,
      isVisibleDialog: false,
    };
  },
  created() {},
  methods: {
    toStringDate,
    openDialog(contentId) {
      this.isVisibleDialog = true;
      this.content = {};
      this.getContentInfo(contentId);
    },
    getContentInfo(contentId) {
      this.loading = true;
      // getContentByIdOwner(contentId)
      //   .then((response) => {
      //     if (response && response.data) {
      //       this.content = Object.assign({}, response.data);
      //       switch (this.content.content_type) {
      //         case objContentType.EVENT: {
      //           setTimeout(() => {
      //             if (this.$refs.eventView) {
      //               this.$refs.eventView.setData(response.data);
      //             }
      //           }, 0);
      //           break;
      //         }
      //         case objContentType.RECRUITMENT: {
      //           setTimeout(() => {
      //             if (this.$refs.recruitmentView) {
      //               this.$refs.recruitmentView.setData(response.data);
      //             }
      //           }, 0);
      //           break;
      //         }
      //       }
      //     } else {
      //       this.isVisibleDialog = false;
      //     }
      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.isVisibleDialog = false;
      //     this.loading = false;
      //   });
    },
    getContentTypeName(contentType) {
      let name = '';
      this.listContentTypes.forEach((item) => {
        if (item.id === contentType) {
          name = item.name;
          return;
        }
      });
      return name;
    },
    handleClose() {
      this.$emit('onClose');
    },
  },
};
</script>

<style scoped>
.html-container {
  border: 1px dashed #bfbfbf;
  min-height: 400px;
  padding: 20px;
}

.avatar-content {
  max-width: 300px;
}
.view-info-item {
  padding-bottom: 20px;
}
.view-info-label {
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
}
.view-info-body {
  margin: 20px 40px;
}
</style>

<style lang="scss">
.view-info {
  .el-dialog__body {
    padding: 20px 20px 0px 20px;
  }
}
</style>
