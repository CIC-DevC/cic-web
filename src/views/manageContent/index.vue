<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        prefix-icon="el-icon-search"
        :placeholder="$t('manageContent.placeholder.title')"
        style="width: 450px;"
        class="filter-item"
        @keyup.enter.native="getList"
      />
      <el-select
        v-model="listQuery.contentType"
        :placeholder="$t('manageContent.placeholder.contentType')"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="(item, index) in listContentTypes"
          :key="index"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
        >{{ $t('button.search') }}</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; min-width: 800px;"
      class="content-table"
    >
      <el-table-column label="#" align="center" :min-width="4">
        <template slot-scope="scope">
          <span>{{ showIndex(scope.$index) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('manageContent.label.title')" :min-width="30">
        <template slot-scope="scope">
          <a :href="'#'" target="_blank" class="link-type">
            {{ scope.row.title }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('manageContent.label.contentType')"
        :min-width="14"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contentTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('manageContent.label.createdAt')"
        :min-width="16"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.created_at">
            {{
              toStringDate(
                scope.row.created_at,
                $t('common.formatDateTimeMoment')
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('manageContent.label.status')"
        :min-width="14"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.contentStatus.type">{{
            scope.row.contentStatus.label
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        class-name="small-padding"
        :min-width="22"
      >
        <template slot-scope="scope">
          <el-tooltip
            :content="$t('manageContent.button.info')"
            placement="bottom"
            :open-delay="500"
          >
            <el-button
              size="small"
              icon="el-icon-info"
              plain
              @click="handleViewInfo(scope.row.content_id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            :content="$t('button.edit')"
            placement="bottom"
            :open-delay="500"
          >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.row.content_id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            :content="$t('manageContent.button.remove')"
            placement="bottom"
            :open-delay="500"
          >
            <el-button type="danger" size="small" icon="el-icon-delete" plain>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <viewInfo
      v-if="isOpenInfoDialog"
      ref="viewInfo"
      @onClose="isOpenInfoDialog = false"
    />
  </div>
</template>

<script>
import { successNotify } from '@/utils/notices';
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import { toStringDate } from '@/utils/datetime';
import viewInfo from './viewInfo';

export default {
  components: { Pagination, viewInfo },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 20,
        title: '',
        contentType: undefined,
        contentStatus: undefined,
      },
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
      isOpenInfoDialog: false,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    toStringDate,
    getList() {
      // this.listLoading = true;
      // getAllContentOwner(this.listQuery)
      //   .then((response) => {
      //     this.list = [];
      //     if (response && response.data) {
      //       if (response.data.results) {
      //         response.data.results.forEach((item) => {
      //           item.contentTypeName = this.getContentTypeName(
      //             item.content_type
      //           );
      //           item.contentStatus = this.getContentStatus(item);
      //           this.list.push(item);
      //         });
      //       }
      //       this.total = response.data.count;
      //     }
      //     this.listLoading = false;
      //   })
      //   .catch((err) => {
      //     this.list = [];
      //     this.total = 0;
      //     this.listLoading = false;
      //   });
    },
    showIndex(index) {
      if (this.listQuery) {
        return (this.listQuery.page - 1) * this.listQuery.size + index + 1;
      }
      return index + 1;
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
    getContentStatus(content) {
      return {};
    },
    handleEdit(contentId) {
      this.$router.push({
        name: 'manageContent.editContent',
        params: { contentId },
      });
    },
    handleViewInfo(contentId) {
      this.isOpenInfoDialog = true;
      setTimeout(() => {
        this.$refs.viewInfo.openDialog(contentId);
      }, 0);
    },
  },
};
</script>
<style scoped>
.el-link {
  text-decoration: none;
  padding: 10px 20px !important;
  font-size: 14px;
  border-radius: 4px;
}
.el-link.el-link--default {
  color: #fff;
}
.input-search {
  background-color: #fff;
}
</style>
<style lang="scss">
.content-table {
  .cell {
    word-break: normal;
    .el-tag {
      height: fit-content;
      white-space: normal;
    }
  }
}
</style>
